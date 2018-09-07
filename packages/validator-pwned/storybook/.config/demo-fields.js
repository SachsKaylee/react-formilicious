import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";

export class DemoFieldPassword extends React.Component {
  static getDefaultValue() {
    return "";
  }

  render() {
    const {
      name, 
      field: { validated, message },
      system: { waiting },
      onChange, value
    } = this.props;

    return (
      <div style={{ margin: 8 }}>
        <label style={{ display: "block" }}>{name}</label>
        <input
          style={{ display: "block" }}
          type={"password"}
          onChange={e => onChange(e.target.value)}
          disabled={waiting}
          value={value} />
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}
