import React from 'react';
import TextField from 'material-ui/TextField';

export default class LoanAmountInput extends React.Component{
    loanAmountChanged(event){
        this.props.updateLoanAmount(event.target.value);
    }
    render(){
        return(
            <TextField floatingLabelText="Loan amount £" type="number" defaultValue={this.props.loanAmount} onChange={this.loanAmountChanged.bind(this)}/>
        )
    }
}