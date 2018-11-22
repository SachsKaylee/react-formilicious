import React from 'react';

class DataChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data || {},
      hasManualData: false
    }
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: (state.hasManualData ? state.data : props.data) || {}
    };
  }

  async onChange() {
    const data = await this.props.change(this.state.data);
    this.setState({ data, hasManualData: true });
  }

  render() {
    return (<div>
      <p>
        <button onClick={this.onChange}>{this.props.text || "Change!"}</button>
      </p>
      <p>
        Data:<br/>
        <code>{JSON.stringify(this.state.data, null, 2)}</code>
      </p>
      <hr />
      {this.props.render(this.state.data)}
    </div>);
  }
}

export default DataChanger;
