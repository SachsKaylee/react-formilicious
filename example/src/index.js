import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import Form from '../../src';
import TextField from '../../src/fields/TextField';
import range from '../../src/validators/range';

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
            placeholder: "🙃 Enter your name here!",
            validator: range({min: 5})
          },
          {
            type: TextField,
            mode: "password",
            key: "password",
            placeholder: "🔑 Your super secret pasword here!",
            validator: range({min: 5})
          }
        ]} />
    </div>);
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));