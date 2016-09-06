/**
 * Created by paulius on 05/09/16.
 */
import { CALCULATE } from './Actions';

const initialState = {
    calculatedValues: {},
};

function CalculatorReducer(state = initialState, action) {
    switch (action.type){
        case CALCULATE:
            return { calculatedValues: calculateValues(action.calculatorValues) };
        default:
            return state;
    }
}

//Selectors
export const getCalculatedValues = state => state.calculatorReducer.calculatedValues;

export default CalculatorReducer;

function calculateValues(calculatorValues) {
    var calculated = {
        monthlyPayment: ' -',
        loanAmountAvailable: ' -',
        totalRepayment: ' -',
        creditCharge: ' -'
    };

    var amount = parseFloat(calculatorValues.loanAmount);
    var monthlyRepayment = parseFloat(calculatorValues.perMonthAmount);
    var months = parseFloat(calculatorValues.termMonths);
    var annualRate = parseFloat(calculatorValues.apr);

    var monthlyRate, monthlyPayment, totalRepayment, creditCharge;


    if (isParametersValid(amount, monthlyRepayment, months, annualRate)) {

        monthlyRate = Math.pow(((annualRate / 100) + 1), 1 / 12) - 1;

        if (calculatorValues.isLoanAmount) {

            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -months));
            totalRepayment = monthlyPayment * months;
            creditCharge = totalRepayment - amount;
            calculated.monthlyPayment = `£${parseFloat(monthlyPayment).toFixed(2)}`;
        }
        else {
            amount = (monthlyRepayment * (1 - Math.pow((1 + monthlyRate), -months))) / monthlyRate;
            totalRepayment = monthlyRepayment * months;
            creditCharge = totalRepayment - amount;
            calculated.loanAmountAvailable = `£${parseFloat(amount).toFixed(2)}`;
            calculated.actualLoanAmountAvailable = `£${parseFloat(amount).toFixed(0)}`;
        }
        calculated.totalRepayment = `£${parseFloat(totalRepayment).toFixed(2)}`;
        calculated.creditCharge = `£${parseFloat(creditCharge).toFixed(2)}`;
    }

    return calculated;
}
function isParametersValid(loanAmount, monthlyRepayment, loanDuration, loanApr) {
    return isValidValue('amount', loanAmount) && isValidValue('duration', loanDuration) && isValidValue('apr', loanApr) &&
        isValidValue('monthlyRepaymentAmount', monthlyRepayment);
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