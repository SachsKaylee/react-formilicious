import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";
import unique from "./unique";
import classnames from "classnames";

export default class TagList extends React.Component {
  static getDefaultValue() {
    return [];
  }

  constructor() {
    super();
    this.state = {
      typingTag: ""
    };
    this.addCustomTag = this.addCustomTag.bind(this);
  }

  blockAddTag() {
    return this.props.system.waiting || (this.props.limit !== undefined && this.props.value.length >= this.props.limit);
  }

  blockRemoveTag() {
    return this.props.system.waiting;
  }

  render() {
    const {
      name, tags = [], allowCustomTags = true, addCustomTagText = "Add a new tag...",
      addCustomTagButtonText = "Add",
      field: { validated, message, initialValue },
      value
    } = this.props;

    const allTags = unique([...tags.map(getTagId), ...initialValue, ...value]);
    const lookup = this.createTagLookup();

    const disableInput = this.blockAddTag();

    return (<div className="field">
      <label className="label">{name}</label>
      <div className="field is-grouped is-grouped-multiline">
        {allTags.map(tag => this.renderTag(tag, lookup))}
        {allowCustomTags && (<div className="contol">
          <div className="tags has-addons">
            <input
              className="tag is-light"
              type="text"
              disabled={disableInput}
              placeholder={addCustomTagText}
              value={this.state.typingTag}
              onChange={e => this.setState({ typingTag: e.target.value })} />
            <a
              className={classnames("tag", disableInput ? "is-light" : "is-dark")}
              onClick={this.addCustomTag}
              disabled={disableInput}>
              {addCustomTagButtonText}
            </a>
          </div>
        </div>)}
      </div>
      <ValidationResult validated={validated} message={message} />
    </div>);
  }

  createTagLookup() {
    const { tags, value, field: { initialValue } } = this.props;
    const valuesLookup = value.reduce((acc, v) => ({ ...acc, [v]: v }), {}); // todo: duplicate reduce
    const initialvaluesLookup = initialValue.reduce((acc, v) => ({ ...acc, [v]: v }), {}); // todo: duplicate reduce
    return {
      ...initialvaluesLookup,
      ...valuesLookup,
      ...(tags ? (Array.isArray(tags) ? tags.reduce((acc, v) => ({ ...acc, [getTagId(v)]: getTagName(v) }), {}) : tags) : {})
    };
  }

  addCustomTag() {
    const disableInput = this.blockAddTag();
    const typingTag = this.state.typingTag.trim();
    const { value } = this.props;
    if (typingTag && !disableInput) {
      this.setState({ typingTag: "" });
      if (value.indexOf(typingTag) === -1) {
        this.enableTag(typingTag);
      }
    }
  }

  renderTag(tag, lookup) {
    const { waiting, value } = this.props;
    const isActive = value.indexOf(tag) !== -1;
    const disableInput = this.blockAddTag();
    const handler = waiting ? undefined : isActive
      ? () => this.disableTag(tag)
      : () => this.enableTag(tag);
    return (<div className="control" key={tag}>
      <div className="tags">
        <a className={classnames({
          "tag": true,
          "is-link": isActive,
          "is-light": !isActive && disableInput,
          "is-dark": !isActive && !disableInput,
          "is-loading": waiting
        })} onClick={handler}>
          {lookup[tag]}
        </a>
      </div>
    </div>);
  }

  enableTag(tag) {
    if (!this.blockAddTag()) {
      const { value, onChange } = this.props;
      onChange([...value, tag]);
    }
  }

  disableTag(tag) {
    const { value, onChange, system: { waiting } } = this.props;
    if (waiting) return;
    onChange(value.filter(value => value !== tag));
  }
}

const getTagId = tag => typeof tag === "string" ? tag : tag.id ? tag.id : typeof tag.name === "string" ? tag.name : JSON.stringify(tag.name);
const getTagName = tag => typeof tag === "string" ? tag : tag.name ? tag.name : tag.id;
