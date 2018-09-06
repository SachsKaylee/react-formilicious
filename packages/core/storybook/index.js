import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldString, DemoFieldNumber, DemoFieldArray } from './.config/demo-fields';
import options, { fnNameOnly } from './.config/options';

storiesOf("Introduction", module)

  .addWithJSX("Welcome", () => (
    <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <div style={{ flex: "0 1 auto" }}>
        This is the storybook for the <strong>core library of react-formilicious</strong>.<br />
        As the core library does not contain any fields at all this storybook does not have any "flashy" content in it.
        If you want to get a first impression of what this library can do, either look at the embedded example below or
        switch over to the <a href="https://patrick-sachs.de/content/react-formilicious/bulma" target="_top">storybook of
        the bulma</a> implementation.
      </div>
      <iframe src="https://patrick-sachs.de/content/react-formilicious/" style={{ flex: "1 1 auto", border: 0 }}></iframe>
    </div>
  ))

  .addWithJSX("Demo fields", () => (
    <Form elements={[
      {
        key: "string",
        name: "String field - Used to represent textual input in this storybook",
        type: fnNameOnly(DemoFieldString)
      },
      {
        key: "number",
        name: "Number field - Used to represent numerical input in this storybook",
        type: fnNameOnly(DemoFieldNumber)
      },
      {
        key: "array",
        name: "Array field - Used to represent a list of values in this storybook",
        type: fnNameOnly(DemoFieldArray)
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Empty form", () => (
    <Form elements={[]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

require("./buttons");
require("./validator-range");
