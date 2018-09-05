import * as React from "react";
import BaseForm from "@react-formilicious/core";
import classNames from "classnames";

const renderBulmaButton = ({ key, name, action, type, waiting }) => {
  const className = classNames("button", waiting && " is-loading", type && "is-" + type);
  return (<a key={key} disabled={waiting} className={className} style={{ margin: 2 }} onClick={action}>
    {name}
  </a>);
};

const renderBulmaForm = ({ elements, buttons, validation }) => {
  return (<form data-react-formilicious>
    {elements}
    <div>
      {buttons}
      {validation}
    </div>
  </form>);
}

export default class Form extends React.PureComponent {
  render() {
    return <BaseForm renderButton={renderBulmaButton} renderForm={renderBulmaForm} {...this.props} />
  }
}