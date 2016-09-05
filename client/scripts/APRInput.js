import React from 'react';
import TextField from 'material-ui/TextField';

export default class PercentageInput extends React.Component{
    aprChanged(event){
        this.props.updateAPR(event.target.value);
    }
    render(){
        return(
            <TextField floatingLabelText="APR %" type="number" defaultValue={this.props.percentage} onChange={this.aprChanged.bind(this)}/>
        )
    }
}