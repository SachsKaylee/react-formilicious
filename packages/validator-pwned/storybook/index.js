import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from "@react-formilicious/core";
import { DemoFieldPassword } from './.config/demo-fields';
import pwned from '@react-formilicious/validator-pwned';
import options, { fnNameOnly } from './.config/options';

storiesOf("Validator: pwned", module)

  .addWithJSX("Basic usage", () => (
    <Form elements={[
      {
        key: "password",
        name: <span>The password will be validated against <a href="https://haveibeenpwned.com">haveibeenpwned.com</a></span>,
        type: fnNameOnly(DemoFieldPassword),
        validator: pwned(),
        isPassword: true
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Custom error threshold", () => (
    <Form elements={[
      {
        key: "required",
        name: "Only counts as an error if more than 1000 other people have used the password (default: 5)",
        type: fnNameOnly(DemoFieldPassword),
        validator: pwned({ errorThreshold: 1000 })
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Custom messages", () => (
    <Form elements={[
      {
        key: "required",
        name: "Customized error messages, useful for e.g. localization",
        type: fnNameOnly(DemoFieldPassword),
        validator: pwned({messages: {
          error: "That password is preeeetty bad m8, as {x} other people have experienced.",
          hint: "This password is OK, but not great. {x} people could tell the story."
        }})
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)
