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
  constructor() {
    super();
    this.mounted = false;
    this.state = {
      version: 0,
      validated: "ok",
      message: null
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prev) {
    const { validated, message } = this.props;
    const version = this.state.version + 1;
    if (validated === "pending" && prev.validated !== "pending") {
      this.setState({ version }, () => setTimeout(() => this.mounted && this.setState(s => s.version === version ? { validated, message } : null), 100));
    }
    if (validated !== "pending" && prev.validated === "pending") {
      this.setState({ version }, () => setTimeout(() => this.mounted && this.setState(s => s.version === version ? { validated, message } : null), 100));
    }
  }

  render() {
    const { validated, message } = this.state;
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