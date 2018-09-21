import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";
import { Input } from "@react-formilicious/core/inputs";

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
        <Input
          style={{ display: "block" }}
          type={"password"}
          onChange={e => onChange(e.target.value)}
          disabled={waiting}
          value={value} />
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}
