import * as React from "react";
import classNames from "classnames";
import find from "./helpers/find";
import makePromise, { thenCatch } from "./helpers/makePromise";
import { sanitizeValidationResult, sanitizeOnSubmitResult } from "./logic/validators/sanitization";
import ValidationResult from "./validators/ValidationResult";
import { mustResolveWithin } from "./helpers/timeout";
import defaultButtons from "./defaultButtons";
import { runValidator } from "./logic/validators/validation";

export default class Form extends React.Component {
  constructor() {
    super();
    this.mounted = false;
    this.state = {
      waiting: false,
      formValidationResult: null,
      fields: {},
      initialData: {}
    };
    this.renderElement = this.renderElement.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.onSubmit = this.onSubmitButtonClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
    this.onResetButtonClick = this.onResetButtonClick.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  static getDerivedStateFromProps(newProps, oldState) {
    // todo: some elements may change completely, requiring us to remove their validation result
    const { elements, data } = newProps;
    const initialData = elements.reduce((acc, element) => {
      const value = data[element.key] === undefined
        ? element.type.getDefaultValue()
        : data[element.key];
      return { ...acc, [element.key]: value };
    }, {});
    return { ...oldState, initialData };
  }

  getSystemProps() {
    const { initialData, fields, waiting } = this.state;
    return {
      initialData, fields, waiting
    };
  }

  getFieldProps(key) {
    const field = this.state.fields[key];
    return {
      ...field,
      key,
      initialValue: this.state.initialData[key]
    };
  }

  getFieldValue(key) {
    const field = this.state.fields[key];
    if (field && field.value !== undefined) return field.value;
    const element = this.getElement(key);
    if (!element.ignoreData) {
      const initialValue = this.state.initialData[key];
      if (initialValue !== undefined) return initialValue;
    }
    return element.type.getDefaultValue();
  }

  getElement(key) {
    return this.props.elements.find(element => element.key === key);
  }

  getFlatDataStructure() {
    const { elements } = this.props;
    return elements.reduce((acc, element) => {
      return { ...acc, [element.key]: this.getFieldValue(element.key) };
    }, {});
  }

  onChange() {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.getFlatDataStructure());
    }
  }

  onChangeField(key, rawValue) {
    // todo: return promise
    // todo: add timeout to field resolve
    const element = this.getElement(key);
    this.setState(s => ({
      fields: {
        ...s.fields, [key]: {
          validated: "pending",
          message: null,
          version: (s.fields[key] && s.fields[key].version) || 0,
          // Do not change value here, keep previous one & wait for the promise to resolve.
        }
      }
    }), () => {
      const version = this.state.fields[key].version;
      Promise.resolve(rawValue)
        .then(value => {
          return new Promise((resolveValidation, rejectValidation) => {
            this.setState(s => (s.fields[key].validated === "pending" && s.fields[key].version === version
              ? { fields: { ...s.fields, [key]: { validated: "pending", message: null, version, value } } }
              : null), () => {
                if (this.state.fields[key].version === version) {
                  // The validateElement function does not reject for "error" validation. It rejects for
                  // actual errors, like a version difference or an unmounted componenet.
                  this.validateElement(element)
                    .then(resolveValidation)
                    .catch(rejectValidation);
                } else {
                  rejectValidation("invalid-version");
                }
              });
          })
        })
        .then(this.onChange)
        .catch(valueError => {
          valueError = sanitizeValidationResult(valueError, true);
          this.setState(s => (s.fields[key].validated === "pending" && s.fields[key].version === version
            ? { fields: { ...s.fields, [key]: { validated: valueError.validated, message: valueError.message, version } } }
            : null), () => "todo reject promise");
        });
    });
  }

  validateElement(element) {
    const key = element.key;
    return new Promise((resolve, reject) => {
      const value = this.getFieldValue(key);
      const version = ((this.state.fields[key] && this.state.fields[key].version) || 0) + 1;
      this.setState(s => ({
        fields: { ...s.fields, [key]: { validated: "pending", message: null, value, version } }
      }), () => {
        this.runElementValidator(element, value).then(res => {
          if (this.mounted) {
            // todo: reject promise if version differs!
            this.setState(s => (s.fields[key].validated === "pending" && s.fields[key].version === version
              ? { fields: { ...s.fields, [key]: { validated: res.validated, message: res.message, version, value } } }
              : null), () => resolve(res));
          } else {
            reject("unmounted");
          }
        });
      });
    });
  }

  validateElements(elements) {
    const all = elements.map(element => this.validateElement(element));
    return Promise.all(all);
  }

  /**
   * Runs the validator of the given element with the optional given value. If no value is given, the current value of the field is used instead.
   * Does not update the state, etc...
   * 
   * This promise always resolves and never fails!
   */
  runElementValidator(element, value = this.getFieldValue(element.key)) {
    const { validatorTimeout = 3000 } = this.props;
    return runValidator(element.validator, value, {
      timeout: validatorTimeout
    });
  }

  onResetButtonClick(e) {
    e.preventDefault();
    this.setState({ fields: {}, formValidationResult: null });
  }

  onSubmitButtonClick(e) {
    e.preventDefault();
    this.setState({ waiting: true }, () => {
      // todo: add a prop to validate the initial values.
      const { elements, validateBeforeSubmit = true } = this.props;
      const promise = validateBeforeSubmit
        ? this.validateElements(elements).then(() => this.submitForm())
        : this.submitForm();
      thenCatch(promise, (res, success) => {
        this.mounted && this.setState({ waiting: false });
        success
          ? console.log("[react-formilicious] Form submit!", { res })
          : console.error("[react-formilicious] Form submit error!", { res });
      });
    });
  }

  findFormError() {
    const { fields } = this.state;
    return find(fields, field => field.validated === "error" || field.validated === "pending");
  }

  submitForm() {
    return new Promise((resolve, reject) => {
      const invalidField = this.findFormError();
      if (invalidField) {
        reject(invalidField);
      } else {
        this.setState({ formValidationResult: null }, () => {
          const { onSubmit } = this.props;
          const data = this.getFlatDataStructure();
          return thenCatch(makePromise(() => onSubmit(data)), onSubmitResult => {
            if (this.mounted) {
              this.setState(s => {
                const { key, ...result } = sanitizeOnSubmitResult(onSubmitResult); // todo: may return multiple results!
                if (!key || !this.getElement(key)) {
                  return { formValidationResult: result };
                } else {
                  return { fields: { ...s.fields, [key]: result } };
                }
              }, () => resolve(data));
            } else {
              reject("unmounted");
            }
          });
        });
      }
    });
  }

  render() {
    return this.renderForm();
  }

  renderForm() {
    const { formValidationResult } = this.state;
    return (<form data-react-formilicious>
      {this.renderElements()}
      {this.renderButtons()}
      <ValidationResult {...formValidationResult} />
    </form>);
  }

  renderButtons() {
    let { buttons = defaultButtons() } = this.props;
    return buttons.map(this.renderButton);
  }

  renderButton({ key, name, action, type }) {
    let actionFn;
    switch (action) {
      case "submit": actionFn = this.onSubmitButtonClick; break;
      case "reset": actionFn = this.onResetButtonClick; break;
      default: actionFn = () => action(this.getFlatDataStructure()); break;
    }
    const { waiting } = this.state;
    // todo: make this rendering logic adjustable
    return (<a key={key} disabled={waiting} className={classNames("button", waiting && " is-loading", type && "is-" + type)} style={{ margin: 2 }} onClick={actionFn}>
      {name}
    </a>);
  }

  renderElements() {
    const { elements } = this.props;
    return elements.map(this.renderElement);
  }

  renderElement({ type: FieldType, key, ...element }) {
    return (<FieldType
      {...element}
      key={key}
      system={this.getSystemProps()}
      field={this.getFieldProps(key)}
      value={this.getFieldValue(key)}
      onChange={newValue => this.onChangeField(key, newValue)} />);
  }
}