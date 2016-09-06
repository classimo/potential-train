/**
 * Created by paulius on 05/09/16.
 */
import { CALCULATE, SWITCH_CALCULATOR, calculate, calculatorType } from './actions';

const initialState = {
    isLoanAmount: true,
    calculator: {
        amountPerMonth: 250,
        apr: 10,
        loanAmount: 1000,
        termMonths: 6
    }
};

function calculator(state = initialState, action) {
    switch (action.type){
        case SWITCH_CALCULATOR:
            return Object.assign({}, state, {
                isLoanAmount: action.isLoanAmount
            });
        case CALCULATE:
            return Object.assign({}, state, {
                calculated: calculateValues(state)
            });
        default:
            return state;
    }
}

//Selectors
export const getCalculatedValues = state => state.calculator.calculated;
export const getIsLoanAmount = state => state.calculator.isLoanAmount;

function calculateValues(state) {
    var calculated = {
        monthlyPayment: ' -',
        loanAmountAvailable: ' -',
        totalRepayment: ' -',
        creditCharge: ' -'
    };

    var amount = parseFloat(state.loanAmount);
    var monthlyRepayment = parseFloat(state.monthlyRepaymentAmount);
    var months = parseFloat(state.term);
    var annualRate = parseFloat(state.apr);

    var monthlyRate, monthlyPayment, totalRepayment, creditCharge;

    if (isParametersValid(amount, monthlyRepayment, months, annualRate)) {

        monthlyRate = Math.pow(((annualRate / 100) + 1), 1 / 12) - 1;

        if (isAnnualRepayment) {

            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -months));
            totalRepayment = monthlyPayment * months;
            creditCharge = totalRepayment - amount;
            calculated.monthlyPayment = `£${parseFloat(monthlyPayment).toFixed(2)}`;
        }
        else {
            loanAmount = (monthlyRepayment * (1 - Math.pow((1 + monthlyRate), -months))) / monthlyRate;
            totalRepayment = monthlyRepayment * months;
            creditCharge = totalRepayment - loanAmount;
            calculated.loanAmountAvailable = `£${parseFloat(loanAmount).toFixed(2)}`;
            calculated.actualLoanAmountAvailable = `£${parseFloat(loanAmount).toFixed(0)}`;
        }
        calculated.totalRepayment = `£${parseFloat(totalRepayment).toFixed(2)}`;
        calculated.creditCharge = `£${parseFloat(creditCharge).toFixed(2)}`;
    }

    return calculated;
}
function isParametersValid(loanAmount, monthlyRepayment, loanDuration, loanApr) {
    return this.isValidValue('amount', loanAmount) && this.isValidValue('duration', loanDuration) && this.isValidValue('apr', loanApr) &&
        this.isValidValue('monthlyRepaymentAmount', monthlyRepayment);
}
function isValidValue(name, value) {
    var loansCalculatorBounds = {

        amount: { minValue: 100, maxValue: 100000},
        monthlyRepaymentAmount: { minValue: 10, maxValue: 5000},
        duration: { minValue: 6, maxValue: 300},
        apr: { minValue: 0.1, maxValue: 100}
    };
    var minValue = loansCalculatorBounds[name].minValue;
    var maxValue = loansCalculatorBounds[name].maxValue;
    return !isNaN(value) && value >= minValue && value <= maxValue;
}