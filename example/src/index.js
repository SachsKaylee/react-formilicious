import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import Form from '../../src';
import TextField from '../../src/fields/TextField';
import Checkbox from '../../src/fields/Checkbox';
import range from '../../src/validators/range';
import required from '../../src/validators/required';
import combined from '../../src/validators/combined';
import checkForAvailableUsername from './validators/checkForAvailableUsername';

class App extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    if (Math.random() > 0.75) {
      throw new Error("A demo error occured while submitting this form again. Just hit retry!")
    }
    alert("The form was submitted!\n\n" + JSON.stringify(data, null, 2));
  }

  render() {
    return (<div className="container">
      <Form
        data={{
          name: "Patrick Sachs"
        }}
        onSubmit={this.onSubmit}
        elements={[
          {
            type: TextField,
            key: "name",
            name: "🙃 Username",
            placeholder: "🙃 Enter your name here!",
            validator: combined(
              range({ min: 4, max: 16 }),
              checkForAvailableUsername()
            )
          },
          {
            type: TextField,
            mode: "password",
            key: "password",
            name: "🔑 Password",
            placeholder: "🔑 Your super secret pasword here!",
            validator: range({ min: 5 })
          },
          {
            type: Checkbox,
            key: "tos",
            name: <span>📄 Accept the <a href="#/tos">TOS</a>?</span>,
            validator: required()
          }
        ]} />
    </div>);
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));