import React from 'react';
import TextField from 'material-ui/TextField';

export default class Amount extends React.Component{
    render(){
        return(
            <TextField className="amount">£{this.props.totalAmount}</TextField>
        )
    }
}