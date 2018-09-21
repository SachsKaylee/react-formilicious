# @react-formilicious/bulma

Fields for react-formilicious, using the Bulma CSS framework. 🎨

See the storybook for documentation and all available components here: https://patricksachs.github.io/react-formilicious/bulma/

## Quick Start

Install `@react-formilicious/bulma`:

```
$ npm i @react-formilicious/bulma
```

Import in your code:

```js
// Make sure to use the Form provided by this library instead of the one by core!
import Form from "@react-formilicious/bulma";
import TagList from "@react-formilicious/bulma/TagList";

<Form
  data={{}}
  elements={[
    {
      key: 'tagList',
      name: 'TagList',
      type: TagList
    }
  ]}
  onSubmit={() => { /* ... */ }}
/>
```

## License

This library is licensed under the MIT License. See the `LICENSE` file at the root of this source tree for more information.
