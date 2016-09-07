import React from 'react';
import TextField from 'material-ui/TextField';

export default class PercentageInput extends React.Component {
  aprChanged(event) {
    this.props.onChange('apr', parseFloat(event.target.value));
    let smt;
  }
  render() {
    return (
            <TextField
              defaultValue={this.props.percentage}
              floatingLabelText="APR %"
              fullWidth
              onChange={this.aprChanged.bind(this)}
              type="number"
            />
        );
  }
}
