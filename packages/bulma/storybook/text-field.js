import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import TextField from "@react-formilicious/bulma/TextField";
import { action } from '@storybook/addon-actions';
import options, { fnNameOnly } from './.config/options';

storiesOf("TextField", module)

  .addWithJSX("Basic TextField", () => (
    <Form elements={[
      {
        key: "textField",
        type: fnNameOnly(TextField),
        name: "TextField"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Placeholder", () => (
    <Form elements={[
      {
        key: "textField",
        type: fnNameOnly(TextField),
        name: "TextField",
        placeholder: "Type your text here"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Different modes", () => (
    <div>
      <p><strong>Hint:</strong> The different modes have best support on mobile by e.g. adjusting the keyboard.</p>
      <hr />
      <Form elements={[{
        key: "number-with-step",
        type: fnNameOnly(TextField),
        mode: "number",
        step: 3,
        name: "Mode: number (with step of 3)"
      }, ...["number", "text", "password", "color", "date", "time", "datetime", "week", "email", "month", "tel", "url", "hidden"].map(mode =>
        ({
          key: mode,
          type: fnNameOnly(TextField),
          mode: mode,
          name: "Mode: " + mode
        })
      )]} data={{}} onSubmit={action("onSubmit")} />
    </div>
  ), options)

  .addWithJSX("Forward settings", () => (
    <div>
      <p>You can pass all valid <input value="input element" /> settings to the text field</p>
      <hr />
      <Form elements={[{
        key: "textField",
        type: fnNameOnly(TextField),
        autoComplete: "name",
        name: "Your name"
      }]} data={{}} onSubmit={action("onSubmit")} />
    </div>
  ), options)
