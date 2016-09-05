import React from 'react';

export default class BookDescription extends React.Component{
    render(){
        return(
            <h3>{this.props.text}</h3>
        )
    }
}