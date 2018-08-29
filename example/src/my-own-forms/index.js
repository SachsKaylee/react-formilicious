import * as React from 'react';

export default class DemoBaseForm extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    alert("The form was submitted!\n\n" + JSON.stringify(data, null, 2));
  }


}