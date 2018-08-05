import * as React from "react";
import find from "./helpers/find";
import makePromise, { thenCatch } from "./helpers/makePromise";
import { sanitizeValidationResult, sanitizeOnSubmitResult } from "./validators";
import ValidationResult from "./validators/ValidationResult";

export default class Form extends React.Component {
  constructor() {
    super();
    this.mounted = true;
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

  componentWillUnmount() {
    this.mounted = false;
  }

  static getDerivedStateFromProps(newProps, oldState) {
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

  onChangeField(key, value) {
    const element = this.getElement(key);
    const version = this.state.fields[key] && this.state.fields[key].version !== undefined ? this.state.fields[key].version + 1 : 0;
    if (!element.validator) {
      this.setState(s => ({
        fields: { ...s.fields, [key]: { validated: "ok", message: null, value, version } }
      }), this.onChange);
    } else {
      this.setState(s => ({
        fields: { ...s.fields, [key]: { validated: "pending", message: null, value, version } }
      }), () => {
        this.runFieldValidator(element, value)
          .then(res => this.mounted && this.setState(s => (s.fields[key].validated === "pending" && s.fields[key].version === version ? {
            fields: {
              ...s.fields, [key]: {
                validated: res.validated,
                message: res.message,
                version,
                value
              }
            }
          } : null), this.onChange));
      });
    }
  }

  runFieldValidator(element, value) {
    return makePromise(() => element.validator(value, this.getSystemProps()))
      .then(sanitizeValidationResult)
      .catch(res => sanitizeValidationResult(res, true));
  }

  onResetButtonClick(e) {
    e.preventDefault();
    this.setState({ fields: {}, formValidationResult: null });
  }

  onSubmitButtonClick(e) {
    e.preventDefault();
    // todo: validate all fields(or just the non validated) one shere. Primary difficulty is here is "pending"!
    // todo: add a prop to validate the initial values.
    const { fields } = this.state;
    const invalidField = find(fields, field => field.validated === "error" || field.validated === "pending");
    if (invalidField) {
      console.warn("[react-formilicious] Form submit error!", { fields, invalidField });
    } else {
      const { onSubmit } = this.props;
      this.setState({ formValidationResult: null, waiting: true }, () => {
        const data = this.getFlatDataStructure();
        console.log("[react-formilicious] Form submit!", { data });
        thenCatch(makePromise(() => onSubmit(data)), onSubmitResult => this.mounted && this.setState(s => {
          const { key, ...result } = sanitizeOnSubmitResult(onSubmitResult);
          if (!key || !this.getElement(key)) {
            return { waiting: false, formValidationResult: result };
          } else {
            return { waiting: false, fields: { ...s.fields, [key]: result } };
          }
        }));
      });
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
    let { buttons } = this.props;
    if (!buttons) {
      buttons = [
        {
          key: "submit",
          name: "✅ Submit",
          action: "submit"
        },
        {
          key: "reset",
          name: "️❎ Reset",
          action: "reset"
        }
      ];
    };
    return buttons.map(this.renderButton);
  }

  renderButton({ key, name, action }) {
    switch (action) {
      case "submit": action = this.onSubmitButtonClick; break;
      case "reset": action = this.onResetButtonClick; break;
      default: action = action; break;
    }
    const { waiting } = this.state;
    // todo: make this rendering logic adjustable
    return (<a key={key} disabled={waiting} className={"button" + (waiting ? " is-loading" : "")} onClick={action}>
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