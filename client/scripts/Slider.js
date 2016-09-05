import React from 'react';
import Rcslider from 'rc-slider';

export default class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.propertyCount
        }
    }
    onPropertyCountChange(val){
        this.props.propertyCountChange(val);
    }
    render(){
        const marks = {
            0: '0',
            20: '20',
            50: '50',
            100: '100',
            200: '200',
            500: '500',
        };

        return(
            <div className="slider">
                <Rcslider
                    min={0}
                    max={500}
                    defaultValue={this.props.propertyCount}
                    marks={marks}
                    onChange={this.onPropertyCountChange.bind(this)}
                />
            </div>
        )
    }
}