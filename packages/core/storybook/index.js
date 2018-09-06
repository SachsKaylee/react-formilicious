import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import DemoField from './DemoField';
import options, { fnNameOnly } from './options';

storiesOf("Basic Form", module)

  .addWithJSX("Empty Form", () => (
    <Form elements={[]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Demo Field", () => (
    <Form elements={[
      {
        key: "demo",
        name: "DemoField",
        type: fnNameOnly(DemoField)
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

require("./buttons");
