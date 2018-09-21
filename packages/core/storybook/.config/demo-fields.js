import * as React from "react";
import lorem from "lorem-ipsum";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";
import { Input } from "@react-formilicious/core/inputs";

export class DemoFieldString extends React.Component {
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
          onChange={e => onChange(e.target.value)}
          disabled={waiting}
          value={value} />
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}

export class DemoFieldNumber extends React.Component {
  static getDefaultValue() {
    return 0;
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
          type="number"
          onChange={e => onChange(parseFloat(e.target.value))}
          disabled={waiting}
          value={value} />
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}

export class DemoFieldArray extends React.Component {
  static getDefaultValue() {
    return [];
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
        <div style={{ display: "block" }}>
          <button disabled={waiting} onClick={e => {
            e.preventDefault();
            onChange([...value, lorem()]);
          }}>+ Add Sentence</button>
          <button disabled={waiting} onClick={e => {
            e.preventDefault();
            const [_, ...newValue] = value;
            onChange(newValue);
          }}>- Remove Sentence</button>
        </div>
        <div style={{ display: "block" }}>
          <strong>Your book({value.length} sentences):</strong> {value.map(entry => <span key={entry}>{entry}{" "}</span>)}
        </div>
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}
