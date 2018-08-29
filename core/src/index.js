import * as React from "react";
import classNames from "classnames";
import find from "./helpers/find";
import makePromise from "./helpers/makePromise";
import { sanitizeValidationResult, sanitizeOnSubmitResult } from "./logic/validators/sanitization";
import ValidationResult from "./validators/ValidationResult";
import { mustResolveWithin } from "./helpers/timeout";
import defaultButtons from "./defaultButtons";
import { runValidator } from "./logic/validators/validation";
import filterObject, { isNotUndefined } from "./helpers/filterObject";

export default class Form extends React.Component {
  constructor() {
    // todo: add a prop to validate the initial values.
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

  setStatePromise(update) {
    return new Promise((res, rej) => {
      let error;
      let changed;
      if (this.mounted) {
        this.setState(s => {
          try {
            changed = typeof update === "function" ? update(s) : update;
            error = null;
          } catch (e) {
            changed = null;
            error = e;
          }
          return changed;
        }, () => {
          if (error) {
            rej(error)
          } else {
            res(changed);
          }
        })
      } else {
        rej("unmounted");
      }
    })
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

  getFieldValue(key, state = this.state) {
    const field = state.fields[key];
    if (field && field.value !== undefined) return field.value;
    const element = this.getElement(key);
    if (!element.ignoreData) {
      const initialValue = state.initialData[key];
      if (initialValue !== undefined) return initialValue;
    }
    return element.type.getDefaultValue();
  }

  putFieldValue(key, values) {
    values = filterObject(values, isNotUndefined);
    return this.setStatePromise(s => ({
      fields: {
        ...s.fields, [key]: s.fields[key]
          ? { ...s.fields[key], ...values }
          : values
      }
    })).then(() => this.state.fields[key]);
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

  getFieldVersion(key) {
    return (this.state.fields[key] && this.state.fields[key].version) || 0;
  }

  fieldMustBeVersion(key, version, willThrow = true) {
    if (version !== this.getFieldVersion(key)) {
      if (willThrow) {
        throw "version-mismatch";
      }
      return false;
    }
    return true;
  }

  async onChangeField(key, rawValue) {
    if (this.state.waiting) {
      console.warn("[react-formilicious]", "Tried to update field \"" + key + "\" with the following value while form was in waiting state.", rawValue);
      return;
    }
    const { fieldTimeout = 3000 } = this.props;
    const element = this.getElement(key);
    const field = await this.putFieldValue(key, {
      version: this.getFieldVersion(key) + 1
    });
    let value = field.value;
    try {
      await mustResolveWithin((async () => {
        // First set the field to pending, then let's start the work.
        this.fieldMustBeVersion(key, field.version);
        await this.putFieldValue(key, {
          validated: "pending",
          message: null
        });
        value = await makePromise(rawValue);
        // Once the field value has been resolved, set it to the field, and then start validating.
        this.fieldMustBeVersion(key, field.version);
        await this.putFieldValue(key, {
          value: value
        });
        const validation = await runValidator(element.validator, value);
        // Once we have validated put the result into the field.
        this.fieldMustBeVersion(key, field.version);
        await this.putFieldValue(key, {
          validated: validation.validated,
          message: validation.message,
          value: value
        });
      })(), fieldTimeout);
      // Fire the onChange event
      if (this.fieldMustBeVersion(key, field.version, false)) {
        this.onChange();
      };
    } catch (error) {
      // If at any point a promise gets rejected, count the validation as failed.
      console.error("Field error", error);
      if (this.fieldMustBeVersion(key, field.version, false)) {
        error = sanitizeValidationResult(error, true);
        await this.putFieldValue(key, {
          validated: error.validated,
          message: error.message,
          value: value
        });
      }
    }
  }

  async revalidateElement(element) {
    const key = element.key;
    let validation;
    // todo: is versioning required here?
    await this.putFieldValue(key, {
      validated: "pending",
      message: null
    });
    const { fieldTimeout = 3000 } = this.props;
    try {
      validation = await mustResolveWithin(runValidator(element.validator, this.getFieldValue(key)), fieldTimeout);
    } catch (error) {
      validation = sanitizeValidationResult(error, true);
    }
    await this.putFieldValue(key, {
      validated: validation.validated,
      message: validation.message
    });
    return validation;
  }

  revalidateElements(elements) {
    const all = elements.map(element => this.revalidateElement(element));
    return Promise.all(all);
  }

  onResetButtonClick(e) {
    e.preventDefault();
    if (!this.isFormReady()) {
      console.warn("[react-formilicious]", "Tried to reset form while form was in waiting state, or a field still pending.");
      return;
    }
    this.setState({ fields: {}, formValidationResult: null });
  }

  async onSubmitButtonClick(e) {
    e.preventDefault();
    // Cannot submit a form that is waiting. (waiting state is true, or a field is pending)
    if (!this.isFormReady()) {
      console.warn("[react-formilicious]", "Tried to submit form while form was in waiting state, or a field still pending.");
      return;
    }
    // Set the form to waiting, to lock everything else out.
    await this.setStatePromise({ waiting: true });
    // Validate the form if desired.
    const { elements, validateBeforeSubmit = true } = this.props;
    if (validateBeforeSubmit) {
      await this.revalidateElements(elements);
    }
    // Submit the actual form.
    try {
      const res = await this.submitForm();
      console.log("[react-formilicious]", "Form submit!", res);
    } catch (e) {
      console.error("[react-formilicious]", "Form submit error!", e);
    }
    // Release the waiting state.
    await this.setStatePromise({ waiting: false });
  }

  isFormReady() {
    const { waiting, fields } = this.state;
    return !waiting && !find(fields, field => field.validated === "pending");
  }

  findFormError() {
    const { fields } = this.state;
    return find(fields, field => field.validated === "error" || field.validated === "pending");
  }

  async submitForm() {
    const invalidField = this.findFormError();
    if (invalidField) {
      throw invalidField;
    }
    await this.setStatePromise({ formValidationResult: null });
    const { onSubmit } = this.props;
    const data = this.getFlatDataStructure();
    let validation;
    try {
      const result = await makePromise(() => onSubmit(data));
      validation = sanitizeOnSubmitResult(result);
    } catch (error) {
      validation = sanitizeOnSubmitResult(error, true);
    }
    await Promise.all(validation.map(single => {
      const { key, ...result } = single;
      if (!key || !this.getElement(key)) {
        return this.setStatePromise({ formValidationResult: result });
      } else {
        return this.putFieldValue(key, result);
      }
    }));
    const error = find(validation, single => single.validated === "error");
    if (error) {
      throw error;
    }
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
    const isReady = this.isFormReady();
    // todo: make this rendering logic adjustable
    return (<a key={key} disabled={!isReady} className={classNames("button", !isReady && " is-loading", type && "is-" + type)} style={{ margin: 2 }} onClick={actionFn}>
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