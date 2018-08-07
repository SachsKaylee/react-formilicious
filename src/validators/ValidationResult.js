import * as React from "react";

const text = {
  pending: "⏳ Please wait ⌛",
  timeout: "⏱️ This field took longer to validate than expected. Please try again... ⏱",
  invalid: "Invalid value"
};

export {
  text
};

export default class ValidationResult extends React.PureComponent {
  render() {
    const { validated, message } = this.props;
    switch (validated) {
      case "pending": return (<span className="help">{text.pending}</span>);
      case "error": return (<span className="help is-danger">{this.errorMessageOf(message)}</span>);
      case "hint": return message && (<span className="help is-info">{message}</span>);
      default: return null;
    }
  }

  errorMessageOf(message) {
    if (!message) return text.invalid;
    if (message === "timeout") return text.timeout;
    return message;
  }
}