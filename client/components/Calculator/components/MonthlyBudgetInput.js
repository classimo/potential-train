/**
 * Created by paulius on 06/09/16.
 */
import React from 'react';
import TextField from 'material-ui/TextField';

export default class MonthlyBudgetInput extends React.Component {
  monthlyBudgetChanged(event) {
    this.props.onChange('perMonthAmount', parseInt(event.target.value));
  }
  render() {
    return (
            <TextField
              defaultValue={this.props.monthlyBudget}
              floatingLabelText="Monthly budget £"
              fullWidth
              onChange={this.monthlyBudgetChanged.bind(this)}
              type="number"
            />
        );
  }
}
