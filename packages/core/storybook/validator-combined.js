
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldString } from './.config/demo-fields';
import combined from "@react-formilicious/core/validators/combined";
import options, { fnNameOnly } from './.config/options';

storiesOf("Validator: combined", module)

  .addWithJSX("Basic usage", () => (
    <Form elements={[
      {
        key: "required",
        name: "Enter text, the validators will tell you the correct format",
        type: fnNameOnly(DemoFieldString),
        validator: combined(
          value => ({
            error: value.indexOf("x") === -1,
            message: "The text must contain an x!"
          }),
          value => ({
            validated: value.lastIndexOf("x") > value.lastIndexOf("y") ? "hint" : "ok",
            message: "Make sure to place a y after the last x."
          }),
          value => ({
            error: value.length !== 4,
            message: "The value must have exactly 4 characters."
          })
        )
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)
