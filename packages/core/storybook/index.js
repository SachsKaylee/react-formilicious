import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldString, DemoFieldNumber } from './.config/demo-fields';
import options, { fnNameOnly } from './options';

storiesOf("Basic Form", module)

  .addWithJSX("Demo fields", () => (
    <Form elements={[
      {
        key: "string",
        name: "String field",
        type: fnNameOnly(DemoFieldString)
      },
      {
        key: "number",
        name: "Number field",
        type: fnNameOnly(DemoFieldNumber)
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Empty form", () => (
    <Form elements={[]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

require("./buttons");
require("./validator-range");
