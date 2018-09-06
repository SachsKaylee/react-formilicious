# react-formilicious

Easy to use, modular and simply delicious forms for React. 📝

* Demo: [https://patrick-sachs.de/content/react-formilicious/](https://patrick-sachs.de/content/react-formilicious/)
* Changelog: [https://github.com/PatrickSachs/react-formilicious/blob/master/CHANGELOG.md](https://github.com/PatrickSachs/react-formilicious/blob/master/CHANGELOG.md)
* Wiki: [https://github.com/PatrickSachs/react-formilicious/wiki](https://github.com/PatrickSachs/react-formilicious/wiki)
* Install: `npm install react-formilicious`

## Motivation

Form management in React has always been a pain point for me. Not due to the lack of expressiveness, but due to the need of manually having to set up every field with its own event handlers, creating a property for it in the state, and possibly adding quite the amount of case-by-case code if you need adjusted validation per field.

This is fine for one or two fields in an application. If you need dozens of fields, this can quickly become an unmaintainable mess.

react-formilicious intends to fix this issue by providing a simple, yet powerful and extendible solution for both simple, aswell as complex and nested forms.

## Feature spotlight

* Simple - Supply a **plain JavaScript object** as the form, Formilicious takes care of the rest. No need to handle events, lifecycle, etc. yourself.
* Extendible - Don't like a default field? Need a customized validator? The **entire library is modular**, you can **easily extend** Formilicious to your needs.
* Asynchronous - A validator needs to contact your server in order to validate a field? Some data needs to be processed before a field can change its value? No problem, Formilicious is **asynchronous by default**!

## Getting started

```shell
$ npm install react-formilicious
```

```jsx
import Form from 'react-formilicious';
import TextField from 'react-formilicious/fields/TextField';
import Checkbox from 'react-formilicious/fields/Checkbox';
import combined from 'react-formilicious/validators/combined';
import range from 'react-formilicious/validators/range';
import required from 'react-formilicious/validators/required';
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

See the [react-formilicious wiki](https://github.com/PatrickSachs/react-formilicious/wiki) for more information, guides & tutorials!

## License

MIT - [https://github.com/PatrickSachs/react-formilicious/blob/master/LICENSE](https://github.com/PatrickSachs/react-formilicious/blob/master/LICENSE)

## Contributing

Always welcome! 
After cloning the repository make sure to run `bootstrap.cmd`(Windows only, feel free to open a PR with a SH file 😃) to get you up and running.
`watch-all.cmd` builds and watches all packages.
