import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Form from "@react-formilicious/bulma";
import TagList from "@react-formilicious/bulma/TagList";
import { action } from '@storybook/addon-actions';
import options, { fnNameOnly } from './.config/options';

storiesOf("TagList", module)

  .addWithJSX("Basic TagList", () => (
    <Form elements={[
      {
        key: "tagList",
        type: fnNameOnly(TagList),
        name: "TagList"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Predefined tags", () => (
    <Form elements={[
      {
        key: "tagList",
        type: fnNameOnly(TagList),
        name: "TagList",
        tags: ["tag-1", "tag-2", "tag-3"]
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Predefined tags only", () => (
    <Form elements={[
      {
        key: "tagList",
        type: fnNameOnly(TagList),
        name: "TagList",
        tags: ["tag-1", "tag-2", "tag-3"],
        allowCustomTags: false
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("Tags with display name", () => (
    <Form elements={[
      {
        key: "tagList",
        type: fnNameOnly(TagList),
        name: "TagList",
        tags: [
          { id: "tag-1", name: "My first tag" },
          { id: "tag-2", name: <span>To <strong>boldly</strong> go where no tag has gone before</span> },
          "tag-3"
        ]
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)

  .addWithJSX("With custom text", () => (
    <Form elements={[
      {
        key: "tagList",
        type: fnNameOnly(TagList),
        name: "TagList",
        addCustomTagText: "Type some random stuff",
        addCustomTagButtonText: "Shove it in there"
      }
    ]} data={{}} onSubmit={action("onSubmit")} />
  ), options)
  