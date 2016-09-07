import React from 'react';
import TextField from 'material-ui/TextField';

export default class MonthsInput extends React.Component {
  termInMonthsChanged(event) {
    this.props.onChange('termMonths', parseInt(event.target.value));
  }
  render() {
    return (
            <TextField
              defaultValue={this.props.termInMonths}
              floatingLabelText="Term in months"
              fullWidth
              onChange={this.termInMonthsChanged.bind(this)}
              type="number"
            />
        );
  }
}
