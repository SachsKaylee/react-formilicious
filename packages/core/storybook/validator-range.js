import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldString, DemoFieldNumber, DemoFieldArray } from './.config/demo-fields';
import range from "@react-formilicious/core/validators/range";
import options, { fnNameOnly } from './.config/options';

storiesOf("Validator: range", module)

  .addWithJSX("Numbers", () => (
    <Form elements={[
      {
        key: "min",
        name: "Min",
        type: fnNameOnly(DemoFieldNumber),
        validator: range({ min: 2 })
      },
      {
        key: "max",
        name: "Max",
        type: fnNameOnly(DemoFieldNumber),
        validator: range({ max: 5 })
      },
      {
        key: "min-max",
        name: "Min & Max",
        type: fnNameOnly(DemoFieldNumber),
        validator: range({ min: 2, max: 5 })
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Strings", () => (
    <Form elements={[
      {
        key: "min",
        name: "Min",
        type: fnNameOnly(DemoFieldString),
        validator: range({ min: 2 })
      },
      {
        key: "max",
        name: "Max",
        type: fnNameOnly(DemoFieldString),
        validator: range({ max: 5 })
      },
      {
        key: "min-max",
        name: "Min & Max",
        type: fnNameOnly(DemoFieldString),
        validator: range({ min: 2, max: 5 })
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Collections", () => (
    <Form elements={[
      {
        key: "min",
        name: "Min",
        type: fnNameOnly(DemoFieldArray),
        validator: range({ min: 2 })
      },
      {
        key: "max",
        name: "Max",
        type: fnNameOnly(DemoFieldArray),
        validator: range({ max: 5 })
      },
      {
        key: "min-max",
        name: "Min & Max",
        type: fnNameOnly(DemoFieldArray),
        validator: range({ min: 2, max: 5 })
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)
