/**
 * Created by paulius on 06/09/16.
 */
import React from 'react';
import TextField from 'material-ui/TextField';

export default class MonthlyBudgetInput extends React.Component{
    monthlyBudgetChanged(event){
        this.props.updateMonthlyBudget(event.target.value);
    }
    render(){
        return(
            <TextField
                floatingLabelText="Monthly budget £"
                type="number"
                defaultValue={this.props.monthlyBudget}
                onChange={this.monthlyBudgetChanged.bind(this)}
            />
        )
    }
}