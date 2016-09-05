import React from 'react';
import TextField from 'material-ui/TextField';

export default class MonthsInput extends React.Component{
    termInMonthsChanged(event){
        this.props.updateMonths(event.target.value);
    }
    render(){
        return(
            <TextField floatingLabelText="Term in months" type="number" defaultValue={this.props.termInMonths} onChange={this.termInMonthsChanged.bind(this)}/>
        )
    }
}