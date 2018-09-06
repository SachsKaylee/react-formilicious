import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import ToggleField from "@react-formilicious/bulma/ToggleField";
import { action } from '@storybook/addon-actions';
import options, { fnNameOnly } from './.config/options';

storiesOf("ToggleField", module)

  .addWithJSX("Basic ToggleField", () => (
    <Form elements={[
      {
        key: "toggleField",
        type: fnNameOnly(ToggleField),
        name: "ToggleField"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Adjusted text", () => (
    <Form elements={[
      {
        key: "toggleField",
        type: fnNameOnly(ToggleField),
        name: "ToggleField",
        trueText: "👍",
        falseText: "👎"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)
