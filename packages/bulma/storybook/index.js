import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import { action } from '@storybook/addon-actions';
import range from "@react-formilicious/core/validators/range";
import combined from "@react-formilicious/core/validators/combined";
import required from "@react-formilicious/core/validators/required";
import TextField from "@react-formilicious/bulma/TextField";
import TextArea from "@react-formilicious/bulma/TextArea";
import ToggleField from "@react-formilicious/bulma/ToggleField";
import Checkbox from "@react-formilicious/bulma/Checkbox";
import options, { fnNameOnly } from './options';

storiesOf("Basic Form", module)

  .addWithJSX("Advanced Form", () => (
    <Form
      elements={[
        {
          type: fnNameOnly(TextField),
          key: "name",
          name: "🙃 Username",
          placeholder: "🙃 Enter your name here!",
          // todo: we need a way to display the exact code below in the storybook.
          validator: combined(
            range({ min: 4, max: 16 })
          )
        },
        {
          type: fnNameOnly(TextField),
          mode: "password",
          key: "password",
          name: "🔑 Password",
          placeholder: "🔑 Your super secret password here!",
          validator: range({ min: 6 })
        },
        {
          type: fnNameOnly(TextArea),
          key: "bio",
          name: "🤖 Tell us something about you!",
          placeholder: "🤖 What kind of developer robot are you?"
        },
        {
          type: fnNameOnly(Checkbox),
          key: "tos",
          name: <span>📄 Accept the <a href="#" target="_self">TOS</a>?</span>,
          validator: required()
        },
        {
          type: fnNameOnly(ToggleField),
          key: "newsletter",
          name: null,
          validator: required("You MUST subscribe to our totally-not-spam newsletter!"),
          trueText: <span>📨 Subscribe to our <em>awesome</em> newsletter</span>,
          falseText: "No newsletter 👎"
        }
      ]}
      data={{}}
      onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Empty Form", () => (
    <Form elements={[]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

require("./Checkbox");
require("./TagList");
require("./TextArea");
require("./TextField");
