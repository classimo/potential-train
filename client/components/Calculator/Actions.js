/**
 * Created by paulius on 05/09/16.
 */
export const CALCULATE = 'CALCULATE';
export const SWITCH_CALCULATOR_TYPE = 'SWITCH_CALCULATOR_TYPE';

export function calculate(calculatorValues) {
    return {
        type: CALCULATE,
        calculatorValues,
    };
}

export function switchCalculatorType(isLoanAmount) {
    return {
        type: SWITCH_CALCULATOR_TYPE,
        isLoanAmount,
    };
}

export function fetchCalculatedValues(calculatorValues) {
    return (dispatch) => {
        return dispatch(calculate(calculatorValues))
    }
}

export function fetchCalculatorType(isLoanAmount) {
    return dispatch => {
        return dispatch(switchCalculatorType(isLoanAmount))
    }
}