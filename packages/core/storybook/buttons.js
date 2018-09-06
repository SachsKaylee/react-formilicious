import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldString } from './.config/demo-fields';
import options, { fnNameOnly, fnFullBody } from './.config/options';

storiesOf("Buttons", module)

  .addWithJSX("Custom buttons", () => (
    <Form
      elements={[
        {
          key: "test",
          type: fnNameOnly(DemoFieldString),
          name: "The 'type' prop of the buttons may have different valid values for different CSS frameworks"
        }
      ]}
      data={{
        test: "Test Value"
      }}
      buttons={[
        {
          key: "my-submit",
          name: "Submit",
          action: "submit",
          type: "green"
        },
        {
          key: "my-reset",
          name: "Reset",
          action: "reset",
          type: "red"
        },
        {
          key: "my-callback",
          name: "Callback",
          action: fnFullBody((values, onClickEvent) => {
            onClickEvent.preventDefault(); // Would navigate out of the storybook iframe
            alert("Form values: " + JSON.stringify(values, null, 2))
          }),
          type: "blue"
        }
      ]} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Empty form without buttons", () => (
    <Form elements={[]} data={{}} buttons={[]} />
  ), options)
