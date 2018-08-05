import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import Form from '../../src';
import TextField from '../../src/fields/TextField';
import range from '../../src/validators/range';
import required from '../../src/validators/required';
import Checkbox from '../../src/fields/Checkbox';

class App extends Component {
  render() {
    return (<div className="container">
      <Form
        data={{
          name: "Patrick Sachs"
        }}
        elements={[
          {
            type: TextField,
            key: "name",
            name: "🙃 Username",
            placeholder: "🙃 Enter your name here!",
            validator: range({min: 5})
          },
          {
            type: TextField,
            mode: "password",
            key: "password",
            name: "🔑 Password",
            placeholder: "🔑 Your super secret pasword here!",
            validator: range({min: 5})
          },
          {
            type: Checkbox,
            key: "tos",
            name: "📄 Accept the TOS?",
            validator: required()
          }
        ]} />
    </div>);
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));