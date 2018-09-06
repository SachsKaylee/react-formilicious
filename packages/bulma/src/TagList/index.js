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

  render() {
    const {
      name, tags = [], allowCustomTags = true,
      field: { validated, message, initialValue },
      system: { waiting },
      value
    } = this.props;

    const allTags = unique([...tags.map(getTagId), ...initialValue, ...value]);
    const lookup = this.createTagLookup();

    return (<div className="field">
      <label className="label">{name}</label>
      <div className="field is-grouped is-grouped-multiline">
        {allTags.map(tag => this.renderTag(tag, lookup))}
        {allowCustomTags && (<div className="contol">
          <div className="tags has-addons">
            <input
              className="tag is-light"
              type="text"
              disabled={waiting}
              placeholder="Add a new tag..."
              value={this.state.typingTag}
              onChange={e => this.setState({ typingTag: e.target.value })} />
            <a className="tag is-dark" onClick={this.addCustomTag} disabled={waiting}>Add</a>
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
    const { typingTag } = this.state;
    const { value, system: { waiting } } = this.props;
    if (!typingTag || waiting) return;
    this.setState({
      typingTag: ""
    }, () => value.indexOf(typingTag) === -1 && this.enableTag(typingTag));
  }

  renderTag(tag, lookup) {
    const { waiting, value } = this.props;
    const isActive = value.indexOf(tag) !== -1;
    const handler = waiting ? undefined : isActive
      ? () => this.disableTag(tag)
      : () => this.enableTag(tag);
    return (<div className="control" key={tag}>
      <div className="tags">
        <a className={classnames("tag", isActive && "is-link", waiting && "is-loading")} onClick={handler}>
          {lookup[tag]}
        </a>
      </div>
    </div>);
  }

  enableTag(tag) {
    const { value, onChange, system: { waiting } } = this.props;
    if (waiting) return;
    onChange([...value, tag]);
  }

  disableTag(tag) {
    const { value, onChange, system: { waiting } } = this.props;
    if (waiting) return;
    onChange(value.filter(value => value !== tag));
  }
}

const getTagId = tag => typeof tag === "string" ? tag : tag.id ? tag.id : typeof tag.name === "string" ? tag.name : JSON.stringify(tag.name);
const getTagName = tag => typeof tag === "string" ? tag : tag.name ? tag.name : tag.id;
