import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";

export default class Checkbox extends React.Component {
  static getDefaultValue() {
    return false;
  }

  render() {
    const {
      name,
      field: { validated, message },
      system: { waiting },
      onChange, value
    } = this.props;

    return (<div className="field">
      <div className="contol">
        <label className="checkbox">
          <input
            style={{ marginRight: 2 }}
            type="checkbox"
            disabled={waiting}
            checked={value}
            onChange={e => onChange(e.target.checked)} />
          <span>{name}</span>
        </label>
      </div>
      <ValidationResult validated={validated} message={message} />
    </div >);
  }
}