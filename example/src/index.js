import * as React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import Form from '../../src';
import TextField from '../../src/fields/TextField';
import Checkbox from '../../src/fields/Checkbox';
import range from '../../src/validators/range';
import required from '../../src/validators/required';
import combined from '../../src/validators/combined';
import checkForAvailableUsername from './validators/checkForAvailableUsername';

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
      <div style={{ textAlign: "center", marginTop: 20 }}>
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
        </div>
      </div>
      <hr />
      <div className="card">
        <div className="card-content">
          <p className="title">Current form values</p>
          <p className="subtitle">Updated on <code className="has-text-info">onChange</code> event</p>
          <pre>
            {JSON.stringify(this.state.currentFormValues, null, 2)}
          </pre>
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
      placeholder: "🔑 Your super secret pasword here!",
      validator: range({ min: 5 })
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
    </div>);
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));