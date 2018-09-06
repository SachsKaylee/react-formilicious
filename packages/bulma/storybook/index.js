import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import { action } from '@storybook/addon-actions';
import options from './options';

storiesOf("Basic Form", module)
  .addWithJSX("Empty Form", () => (
    <Form elements={[]} data={{}} onSubmit={action("onSubmit")} />
  ), options);

require("./Checkbox");
require("./TagList");
require("./TextArea");
require("./TextField");
