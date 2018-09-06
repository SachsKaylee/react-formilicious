import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import TextArea from "@react-formilicious/bulma/TextArea";
import { action } from '@storybook/addon-actions';
import options, { nameOnly } from '../options';

storiesOf("TextArea", module)

  .addWithJSX("Basic TextArea", () => (
    <Form elements={[
      {
        key: "textArea",
        type: nameOnly(TextArea),
        name: "TextArea"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Placeholder", () => (
    <Form elements={[
      {
        key: "textArea",
        type: nameOnly(TextArea),
        name: "TextArea",
        placeholder: "Type your text here"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)   

  .addWithJSX("Changed line count", () => (
    <Form elements={[
      {
        key: "textArea",
        type: nameOnly(TextArea),
        name: "TextArea",
        lines: 2
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)   
