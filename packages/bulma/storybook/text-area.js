import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import TextArea from "@react-formilicious/bulma/TextArea";
import { action } from '@storybook/addon-actions';
import options, { fnNameOnly } from './.config/options';

storiesOf("TextArea", module)

  .addWithJSX("Basic TextArea", () => (
    <Form elements={[
      {
        key: "textArea",
        type: fnNameOnly(TextArea),
        name: "TextArea"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Placeholder", () => (
    <Form elements={[
      {
        key: "textArea",
        type: fnNameOnly(TextArea),
        name: "TextArea",
        placeholder: "Type your text here"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Changed line count", () => (
    <Form elements={[
      {
        key: "textArea",
        type: fnNameOnly(TextArea),
        name: "TextArea",
        lines: 2
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Forward settings", () => (
    <div>
      <p>You can pass all valid <textarea value="textarea element" /> settings to the text field</p>
      <hr />
      <Form elements={[
        {
          key: "textArea",
          type: fnNameOnly(TextArea),
          name: "Shipping address",
          autoComplete: "street-address"
        }
      ]} data={{}} onSubmit={action("onSubmit")} />
    </div>
  ), options)   
