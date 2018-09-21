import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * This special type of input retains the cursor position over value changes. 
 * It behaves like a normal input.
 */
export class Input extends React.PureComponent {
  render() {
    return <input {...this.props} value={undefined} />;
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    // Chrome Bug: Only text inputs can change selection
    if (node.type === "text") {
      const oldLength = node.value.length;
      const oldIdx = node.selectionStart;
      node.value = this.props.value;
      const newIdx = Math.max(0, node.value.length - oldLength + oldIdx);
      node.selectionStart = node.selectionEnd = newIdx;
    }
  }
}
/**
 * This special type of input retains the cursor position over value changes. 
 * It behaves like a normal input.
 */
export class TextArea extends React.PureComponent {
  render() {
    return <textarea {...this.props} value={undefined} />;
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    const oldLength = node.value.length;
    const oldIdx = node.selectionStart;
    node.value = this.props.value;
    const newIdx = Math.max(0, node.value.length - oldLength + oldIdx);
    node.selectionStart = node.selectionEnd = newIdx;
  }
}
