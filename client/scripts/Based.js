import React from 'react';

export default class Based extends React.Component{
    render(){
        return(
            <div className="based">Based on {this.props.propertyCount} properties, spending £{this.props.perMonthAmount} p/m</div>
        )
    }
}