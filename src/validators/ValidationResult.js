import * as React from "react";

export default class ValidationResult extends React.PureComponent {
  render() {
    const { validated, message } = this.props;
    switch (validated) {
      case "pending": return (<span className="tag">⏳ Please wait ⌛</span>);
      case "error": return (<span className="tag is-danger">{message || "Invalid value."}</span>);
      case "hint": return message && (<span className="tag is-info">{message}</span>);
      default: return null;
    }
  }
}