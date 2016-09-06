import React, { PropTypes } from 'react';
import Container from  './components/Container';
import Title from './components/Title';
import APRInput from './components/APRInput';
import LoanAmountInput from './components/LoanAmountInput';
import MonthlyBudgetInput from './components/MonthlyBudgetInput';
import MonthsAmountInput from './components/MonthsInput';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TypeSwitch from './components/TypeSwitch';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

// Import Selectors
import { getCalculatedValues } from './CalculatorReducer';
import { getIsLoanAmount } from './CalculatorSwitchReducer';

// Import Actions
import { calculate, switchCalculatorType, fetchCalculatorType, fetchCalculatedValues } from './Actions';

injectTapEventPlugin();

class Calculator extends React.Component{
    componentDidMount() {
        this.props.dispatch(fetchCalculatedValues(this.props.calculator));
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    updateMonths(months){
        var calculatorValues = this.props.calculator;
        calculatorValues.termMonths = months;
        this.props.dispatch(calculate(calculatorValues));
    }
    updateAPR(apr){
        var calculatorValues = this.props.calculator;
        calculatorValues.apr = apr;
        this.props.dispatch(calculate(calculatorValues));
    }
    updateLoanAmount(loanAmount){
        var calculatorValues = this.props.calculator;
        calculatorValues.loanAmount = loanAmount;
        this.props.dispatch(calculate(calculatorValues));
    }
    switchType(isLoanAmount){
        var isLA = false;
        if(isLoanAmount === "loanAmount"){
            isLA = true;
        }
        this.props.dispatch(switchCalculatorType(isLA));
        var calculatorValues = this.props.calculator;
        calculatorValues.isLoanAmount = isLA;
        this.props.dispatch(calculate(calculatorValues));
    }
    updateMonthlyBudget(monthlyBudget){
        var calculatorValues = this.props.calculator;
        calculatorValues.perMonthAmount = monthlyBudget;
        this.props.dispatch(calculate(calculatorValues));
    }
    render(){
        let loanAmountOrMonthlyBudgetInput = <LoanAmountInput loanAmount={this.props.calculator.loanAmount} updateLoanAmount={this.updateLoanAmount.bind(this)}/>;
        if(!this.props.isLoanAmount){
            loanAmountOrMonthlyBudgetInput = <MonthlyBudgetInput monthlyBudget={this.props.calculator.perMonthAmount} updateMonthlyBudget={this.updateMonthlyBudget.bind(this)} />
        }
        return(
        <Paper zDepth={1} >
            <Container>
                <Title text="Loan calculator" />
                {loanAmountOrMonthlyBudgetInput}
                <MonthsAmountInput termInMonths={this.props.calculator.termMonths} updateMonths={this.updateMonths.bind(this)}/>
                <APRInput percentage={this.props.calculator.apr} updateAPR={this.updateAPR.bind(this)}/>
                <TypeSwitch isLoanAmount={this.props.calculator.isLoanAmount} switchType={this.switchType.bind(this)}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>{this.props.isLoanAmount ? "Monthly repayments":"Loan amount available"}</TableHeaderColumn>
                            <TableHeaderColumn>Total amount to repay</TableHeaderColumn>
                            <TableHeaderColumn>APR</TableHeaderColumn>
                            <TableHeaderColumn>Total cost of credit</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableRowColumn><span>{this.props.isLoanAmount ? this.props.calculatedValues.monthlyPayment : this.props.calculatedValues.loanAmountAvailable}</span></TableRowColumn>
                            <TableRowColumn><span>{this.props.calculatedValues.totalRepayment}</span></TableRowColumn>
                            <TableRowColumn><span>{this.props.calculator.apr} %</span></TableRowColumn>
                            <TableRowColumn><span>{this.props.calculatedValues.creditCharge}</span></TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Container>
        </Paper>
        )
    }
}
// Actions required to provide data for this component to render in sever side.
Calculator.need = [() => { return fetchCalculatedValues(this.props.calculator); }];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        calculatedValues: getCalculatedValues(state),
        isLoanAmount: getIsLoanAmount(state)
    };
}

Calculator.propTypes = {
    calculator: PropTypes.shape({
        perMonthAmount: PropTypes.number.isRequired,
        isLoanAmount: PropTypes.bool.isRequired,
        apr: PropTypes.number.isRequired,
        loanAmount: PropTypes.number.isRequired,
        termMonths: PropTypes.number.isRequired,
    }).isRequired,
    calculatedValues: PropTypes.shape({
        monthlyPayment: PropTypes.string,
        totalRepayment: PropTypes.string,
        creditCharge: PropTypes.string,
    }),
    dispatch: PropTypes.func.isRequired,
};

Calculator.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Calculator);