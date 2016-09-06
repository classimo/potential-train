/**
 * Created by paulius on 05/09/16.
 */
export const CALCULATE = 'CALCULATE';
export const SWITCH_CALCULATOR = 'SWITCH_TYPE';

export function calculate(calculatorValues) {
    return {
        type: CALCULATE,
        calculatorValues,
    };
}

export function calculatorType(isLoanAmount) {
    return {
        type: SWITCH_CALCULATOR,
        isLoanAmount,
    };
}