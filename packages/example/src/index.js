// Basic Setup
import * as React from 'react';
import ReactDOM from 'react-dom';
import Form from '@react-formilicious/core';
import "./index.css";
/*import JSONEditor from "react-json-editor-ajrm";
import en from 'react-json-editor-ajrm/locale/en';*/
// Fields
import TextField from '@react-formilicious/fields-bulma/TextField';
import TextArea from '@react-formilicious/fields-bulma/TextArea';
import Checkbox from '@react-formilicious/fields-bulma/Checkbox';
import ToggleField from './my-own-fields/ToggleField';
// Validators
import range from '@react-formilicious/core/validators/range';
import required from '@react-formilicious/core/validators/required';
import combined from '@react-formilicious/core/validators/combined';
import pwned from '@react-formilicious/validator-pwned';
import checkForAvailableUsername from './my-own-validators/checkForAvailableUsername';

const additionalForms = [
  require("./my-own-forms/DevTestForm"),
  require("./my-own-forms/TextFieldForm"),
  require("./my-own-forms/TagListForm"),
];

class App extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      currentFormValues: {}
    };
  }

  onChange(data) {
    // Saving the current state of the form is not required for the functionality of the form. We 
    // only save it to display it as JSON in the card below.
    this.setState({ currentFormValues: data });
  }

  onSubmit(data) {
    const error = Math.random();
    if (error > 0.9) {
      throw new Error("I am the form police and decided that there is a demo error in your form. Beep! Boop! 🤖");
    }
    if (error > 0.8) {
      throw new Error("An evil unicorn interrupted the data transfer to the server! Oh noes! Try again... 🦄");
    }
    alert("The form was submitted!\n\n" + JSON.stringify(data, null, 2));
  }

  render() {
    return (<div className="container">
      <div style={{ textAlign: "center" }}>
        <a href="https://github.com/PatrickSachs/react-formilicious" target="_blank">View on GitHub!<br />https://github.com/PatrickSachs/react-formilicious</a>
      </div>
      <hr />
      <div className="card">
        <div className="card-content">
          <p className="title">react-formilicious</p>
          <p className="subtitle">A simple demo login form</p>
          <Form
            data={{
              name: "Patrick Sachs"
            }}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
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
                placeholder: "🔑 Your super secret password here!",
                validator: pwned()
              },
              {
                type: TextArea,
                key: "bio",
                name: "🤖 Tell us something about you!",
                placeholder: "🤖 What kind of developer robot are you?"
              },
              {
                type: ToggleField,
                key: "newsletter",
                name: <span>📨 Subscribe to our <em>awesome</em> newsletter?</span>,
                validator: required("You MUST subscribe to our totally-not-spam newsletter!")
              },
              {
                type: Checkbox,
                key: "tos",
                name: <span>📄 Accept the <a href="#/tos">TOS</a>?</span>,
                validator: required()
              }
            ]} />
        </div>
      </div>
      <hr />
      <div className="card">
        <div className="card-content">
          <p className="title">Current form values</p>
          <p className="subtitle">Updated on <code className="has-text-info">onChange</code> event</p>
          <pre>{JSON.stringify(this.state.currentFormValues, null, 2)}</pre>
          {/*<JSONEditor
            id="data"
            placeholder={this.state.currentFormValues}
            theme="light_mitsuketa_tribute"
            locale={en}
            width="100%"
            height="130px"
            confirmGood={false}
          />*/}
        </div>
      </div>
      <hr />
      <div className="card">
        <div className="card-content">
          <p className="title">How to?</p>
          <p className="subtitle">All that's required for the form above is the following code</p>
          <pre>{`<Form
  data={{
    name: "Patrick Sachs"
  }}
  onSubmit={data => alert(JSON.stringify(data))}
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
      placeholder: "🔑 Your super secret password here!",
      validator: range({ min: 5 })
    },
    {
      type: TextArea,
      key: "bio",
      name: "🤖 Tell us something about you!",
      placeholder: "🤖 What kind of developer robot are you?"
    },
    {
      type: Checkbox,
      key: "tos",
      name: <span>📄 Accept the <a href="#/tos">TOS</a>?</span>,
      validator: required()
    }
  ]} />`}</pre>
        </div>
      </div>
      {additionalForms.map(({ title, subtitle, default: TheForm }) => (<div key={TheForm.name}>
        <hr />
        <div className="card">
          <div className="card-content">
            <p className="title">{title}</p>
            <p className="subtitle">{subtitle}</p>
            <TheForm />
          </div>
        </div>
      </div>))}
    </div>);
  }
}

ReactDOM.render(<div style={{ padding: 20 }}><App /></div>, document.querySelector('#root'));