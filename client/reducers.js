/**
 * Created by paulius on 06/09/16.
 */
/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import calculatorReducer from './modules/Calculator/CalculatorReducer';
import calculatorSwitchReducer from './modules/Calculator/CalculatorSwitchReducer'

// Combine all reducers into one root reducer
export default combineReducers({
    calculatorReducer,
    calculatorSwitchReducer
});
