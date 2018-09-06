import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import Checkbox from "@react-formilicious/bulma/Checkbox";
import { action } from '@storybook/addon-actions';
import options, { fnNameOnly } from './.config/options';

storiesOf("Checkbox", module)
  .addWithJSX("Basic Checkbox", () => (
    <Form elements={[
      {
        key: "checkbox",
        type: fnNameOnly(Checkbox),
        name: "Checkbox"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options);   
