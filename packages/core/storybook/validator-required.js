import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldString, DemoFieldNumber, DemoFieldArray } from './.config/demo-fields';
import required from "@react-formilicious/core/validators/required";
import options, { fnNameOnly } from './.config/options';

storiesOf("Validator: required", module)

  .addWithJSX("Numbers", () => (
    <Form elements={[
      {
        key: "required",
        name: "Required",
        type: fnNameOnly(DemoFieldNumber),
        validator: required()
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Strings", () => (
    <Form elements={[
      {
        key: "required",
        name: "Required",
        type: fnNameOnly(DemoFieldString),
        validator: required()
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Collections", () => (
    <Form elements={[
      {
        key: "required",
        name: "Required",
        type: fnNameOnly(DemoFieldArray),
        validator: required()
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Custom message", () => (
    <Form elements={[
      {
        key: "name",
        name: "Your name",
        type: fnNameOnly(DemoFieldString),
        validator: required("Please enter your name")
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)
