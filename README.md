# @react-formilicious/core

Easy to use, modular and simply delicious forms for React. 📝

* Demo: https://patricksachs.github.io/react-formilicious/build
* Changelog: https://github.com/PatrickSachs/react-formilicious/blob/master/CHANGELOG.md
* Wiki: https://github.com/PatrickSachs/react-formilicious/wiki
* Storybook: https://patricksachs.github.io/react-formilicious/core (https://patricksachs.github.io/react-formilicious/bulma for something visual)
* Install: `npm install @react-formilicious/core`

## Motivation

Form management in React has always been a pain point for me. Not due to the lack of expressiveness, but due to the need of manually having to set up every field with its own event handlers, creating a property for it in the state, and possibly adding quite the amount of case-by-case code if you need adjusted validation per field.

This is fine for one or two fields in an application. If you need dozens of fields, this can quickly become an unmaintainable mess.

react-formilicious intends to fix this issue by providing a simple, yet powerful and extendible solution for both simple, aswell as complex and nested forms.

## Feature spotlight

* Simple - Supply a **plain JavaScript object** as the form, Formilicious takes care of the rest. No need to handle events, lifecycle, etc. yourself.
* Extendible - Don't like a default field? Need a customized validator? The **entire library is modular**, you can **easily extend** Formilicious to your needs.
* Asynchronous - A validator needs to contact your server in order to validate a field? Some data needs to be processed before a field can change its value? No problem, Formilicious is **asynchronous by default**!

## Getting started

The core library does not include any fields since they are styling specific. In this quick guide we will be using the Bulma fields. Feel free to check if fields for your favourite framework are available under https://github.com/PatrickSachs/react-formilicious/tree/master/packages.

```shell
$ npm install @react-formilicious/core
$ npm install @react-formilicious/bulma
```

```jsx
import Form from '@react-formilicious/core';
import combined from '@react-formilicious/core/validators/combined';
import range from '@react-formilicious/core/validators/range';
import required from '@react-formilicious/core/validators/required';
import TextField from '@react-formilicious/bulma/TextField';
import Checkbox from '@react-formilicious/bulma/Checkbox';
import checkForAvailableUsername from './my-own-validators/checkForAvailableUsername';

<Form
  data={{
    name: "Patrick Sachs"
  }}
  onSubmit={data => alert(JSON.stringify(data))}
  elements={[
    {
      type: TextField,
      key: "name",
      name: "🙃 Username",
      placeholder: "🙃 Enter your name here!",
      validator: combined(
        range({ min: 4, max: 16 }),
        checkForAvailableUsername()
      )
    },
    {
      type: TextField,
      key: "password",
      name: "🔑 Password",
      mode: "password",
      placeholder: "🔑 Your super secret password here!",
      validator: range({ min: 5 })
    },
    {
      type: Checkbox,
      key: "tos",
      name: <span>📄 Accept the <a href="#/tos">TOS</a>?</span>,
      validator: required()
    }
  ]} />
```

![Demo Image](https://patrick-sachs.de/content/react-formilicious/demo.png?)

See the [react-formilicious wiki](https://github.com/PatrickSachs/react-formilicious/wiki) and/or the Storybook or the [core](https://patricksachs.github.io/react-formilicious/core) and [bulma](https://patricksachs.github.io/react-formilicious/bulma) library for more information, guides & tutorials!

## License

MIT - https://github.com/PatrickSachs/react-formilicious/blob/master/packages/core/LICENSE

## Contributing

Always welcome! 
After cloning the repository make sure to run `bootstrap.cmd`(Windows only, feel free to open a PR with a SH file 😃) to get you up and running.
`watch-all.cmd` builds and watches all packages.
