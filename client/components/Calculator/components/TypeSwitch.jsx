/**
 * Created by paulius on 06/09/16.
 */

import React, { PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export default class TypeSwitch extends React.Component {
  calculatorSwitchChanged(event) {
    this.props.switchType(event.target.value);
  }
  render() {
    let defaultSelected = 'loanAmount';
    if (!this.props.isLoanAmount) {
      defaultSelected = 'monthlyBudget';
    }
    return (
            <RadioButtonGroup name="typeSwitch" defaultSelected={defaultSelected} onChange={this.calculatorSwitchChanged.bind(this)}>
                <RadioButton
                  value="loanAmount"
                  label="Loan amount"
                />
                <RadioButton
                  value="monthlyBudget"
                  label="Monthly budget"
                />
            </RadioButtonGroup>
        );
  }
}

TypeSwitch.propTypes = {
  isLoanAmount: PropTypes.bool.isRequired,
};
