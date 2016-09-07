/**
 * Created by paulius on 06/09/16.
 */
import { SWITCH_CALCULATOR_TYPE } from './Actions';

const initialState = {
    isLoanAmount: true,
};


function CalculatorSwitcherReducer(state = initialState, action) {
    switch (action.type){
        case SWITCH_CALCULATOR_TYPE:
            return { isLoanAmount: action.isLoanAmount };
        default:
            return state;
    }
}

export const getIsLoanAmount = state => state.calculatorSwitchReducer.isLoanAmount;

export default CalculatorSwitcherReducer;