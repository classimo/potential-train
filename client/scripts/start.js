import React from 'react';
import ReactDOM from 'react-dom';
import GloLoanCalculator from './App';

var divAppContainer = document.getElementById('app-container');
ReactDOM.render(<GloLoanCalculator/>, divAppContainer);
document.body.appendChild(divAppContainer);