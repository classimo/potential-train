import React from 'react';
import TextField from 'material-ui/TextField';

export default class LoanAmountInput extends React.Component {
  loanAmountChanged(event) {
    this.props.onChange('loanAmount', parseInt(event.target.value));
  }
  render() {
    return (
            <TextField
              defaultValue={this.props.loanAmount}
              floatingLabelText="Loan amount £"
              fullWidth
              onChange={this.loanAmountChanged.bind(this)}
              type="number"
            />
        );
  }
}
