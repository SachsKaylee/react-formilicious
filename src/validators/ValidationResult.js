import * as React from "react";

export default class ValidationResult extends React.PureComponent {
  render() {
    const { validated, message } = this.props;
    switch (validated) {
      case "pending": return "... Please wait";
      case "error": return <span>ERROR -- {message}</span>
      case "hint": return message;
      default: return null;
    }
  }
}