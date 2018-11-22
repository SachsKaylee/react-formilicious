import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { pass } from "@react-formilicious/core/helpers/timeout";
import { DemoFieldString, DemoFieldNumber, DemoFieldArray } from './.config/demo-fields';
import options, { fnNameOnly, fnFullBody } from './.config/options';
import DataChanger from './DataChanger';

let frameSrc, bulmaHref, sourceHref;
if (location.hostname === "localhost") {
  frameSrc = "http://localhost:3000/";
  bulmaHref = "http://localhost:9002/";
  sourceHref = "https://github.com/PatrickSachs/react-formilicious/tree/master/packages";
} else {
  frameSrc = "https://patricksachs.github.io/react-formilicious/build/";
  bulmaHref = "https://patricksachs.github.io/react-formilicious/bulma/";
  sourceHref = "https://github.com/PatrickSachs/react-formilicious/tree/master/packages";
}

storiesOf("Introduction", module)

  .addWithJSX("Welcome", () => (
    <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <div style={{ flex: "0 1 auto", fontFamily: "sans-serif" }}>
        This is the storybook for the <strong>core library of react-formilicious</strong>.
        <br />
        As the core library does not contain any fields at all this storybook does not have any "flashy" content in it.
        If you want to get a first impression of what this library can do, either look at the embedded example below or
        switch over to the <a href={bulmaHref} target="_top">storybook of
        the bulma</a> implementation.
        <br />
        Please make sure to also always read the source code of the storybook as some things can not always be displayed in
        the "JSX" panel below(indicated by a function called "noRefCheck"). You can find the source code <a href={sourceHref}
          target="_top">on GitHub</a>.
      </div>
      <iframe src={frameSrc} style={{ flex: "1 1 auto", border: 0 }}></iframe>
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

  .addWithJSX("Values changed later", () => {
    return (<DataChanger
      text="Change after 10ms"
      data={{ field1: "Initial Field 1", field2: "Initial Field 2" }}
      change={data => pass(10, data).then(data => ({
        field1: data.field2 + " - Swapped with field2!",
        field2: Math.random() * 255
      }))}
      render={fnFullBody(data => (
        <Form
          data={data}
          onSubmit={action("onSubmit")}
          elements={[
            {
              key: "field1",
              name: "Field 1",
              type: fnNameOnly(DemoFieldString)
            },
            {
              key: "field2",
              name: "Field 2",
              type: fnNameOnly(DemoFieldString)
            }
          ]} />))} />);
  }, options)

require("./buttons");
require("./validator-async");
require("./validator-combined");
require("./validator-range");
require("./validator-required");
