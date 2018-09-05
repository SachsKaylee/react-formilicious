import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";

// The Storybook allows you to create individual demos for your components.

// Please keep in mind that Storybook support is highly experimental and *will* 
// undergo drastic change in future versions.

// https://storybook.js.org/basics/guide-react/

storiesOf("Basic Form", module)
  .add("Empty Form", () => (
    <Form elements={[]} data={{}} onSubmit={action("onSubmit")} />
  ));   
