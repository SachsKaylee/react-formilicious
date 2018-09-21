import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldString } from './.config/demo-fields';
import { pass } from "@react-formilicious/core/helpers/timeout";
import options, { fnNameOnly } from './.config/options';

storiesOf("Async validators", module)

  .addWithJSX("Passing after a certain time", () => (
    <Form elements={[
      {
        key: "field1",
        name: "This field has a validator that will pass after 1 second",
        type: fnNameOnly(DemoFieldString),
        validator: () => pass(1000, { error: false, message: "Passed" })
      },
      {
        key: "field2",
        name: "This field has a validator that will pass after 0-1.5 seconds",
        type: fnNameOnly(DemoFieldString),
        validator: () => pass(Math.random() * 1500, { error: false, message: "Passed" })
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)
