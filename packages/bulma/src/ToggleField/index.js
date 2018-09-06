import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";

export default class ToggleField extends React.Component {
  static getDefaultValue() {
    return false;
  }

  render() {
    const { value, name, onChange, field, system: { waiting } } = this.props;
    return (<div className="field">
      <label className="label">{name}</label>
      <div className="field has-addons">
        <p className="control">
          <a className={value ? "button is-info" : "button"} onClick={() => !waiting && onChange(true)} disabled={value || waiting}>
            <span>{this.props.trueText || "Yes"}</span>
          </a>
        </p>
        <p className="control">
          <a className={value ? "button" : "button is-info"} onClick={() => !waiting && onChange(false)} disabled={!value || waiting}>
            <span>{this.props.falseText || "No"}</span>
          </a>
        </p>
      </div>
      <ValidationResult {...field} />
    </div>);
  }
}