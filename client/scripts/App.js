import React, { PropTypes } from 'react';
import Container from  './Container';
import Title from './Title';
import APRInput from './APRInput';
import LoanAmountInput from './LoanAmountInput';
import MonthsAmountInput from './MonthsInput';
import injectTapEventPlugin from 'react-tap-event-plugin';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

injectTapEventPlugin();

class GloLoanCalculator extends React.Component{
    componentDidMount() {
        this.props.dispatch(fetchLeagueTeams(70));
    }
    calculate(loanAmount, term, apr, monthlyRepaymentAmount, isAnnualRepayment) {

        var calculated = {
            monthlyPayment: ' -', 
            loanAmountAvailable: ' -', 
            totalRepayment: ' -', 
            creditCharge: ' -'
        };
        
        var amount = parseFloat(loanAmount);
        var monthlyRepayment = parseFloat(monthlyRepaymentAmount);
        var months = parseFloat(term);
        var annualRate = parseFloat(apr);

        var monthlyRate, monthlyPayment, totalRepayment, creditCharge;

        if (this.isParametersValid(amount, monthlyRepayment, months, annualRate)) {

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
    };
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    isParametersValid(loanAmount, monthlyRepayment, loanDuration, loanApr) {

        return this.isValidValue('amount', loanAmount) && this.isValidValue('duration', loanDuration) && this.isValidValue('apr', loanApr) &&
            this.isValidValue('monthlyRepaymentAmount', monthlyRepayment);
    }
    isValidValue(name, value) {
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
    updateMonths(months){
        this.props.months = months;
        this.render();
    }
    updateAPR(apr){
        this.render();
    }
    updateLoanAmount(loanAmount){
        this.render();
    }
    render(){
        let propsToRender = this.calculate(this.props.loanAmount,this.props.months, this.props.apr, this.props.perMonthAmount, true);
        return(
        <Paper  zDepth={1} >
            <Container>
                <Title text="Loan calculator" />
                <LoanAmountInput loanAmount={this.props.loanAmount} updateLoanAmount={this.updateLoanAmount.bind(this)}/>
                <MonthsAmountInput termInMonths={this.props.months} updateMonths={this.updateMonths.bind(this)}/>
                <APRInput percentage={this.props.apr} updateAPR={this.updateAPR.bind(this)}/>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Monthly repayments</TableHeaderColumn>
                            <TableHeaderColumn>Total amount to repay</TableHeaderColumn>
                            <TableHeaderColumn>APR</TableHeaderColumn>
                            <TableHeaderColumn>Total cost of credit</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableRowColumn><span>{propsToRender.monthlyPayment}</span></TableRowColumn>
                            <TableRowColumn><span>{propsToRender.totalRepayment}</span></TableRowColumn>
                            <TableRowColumn><span>{this.props.apr}</span></TableRowColumn>
                            <TableRowColumn><span>{propsToRender.creditCharge}</span></TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Container>
        </Paper>
        )
    }
}
// Actions required to provide data for this component to render in sever side.
// MainPage.need = [() => { return fetchLeagueTeams(70); }];
// MainPage.need = [() => { return fetchTeamFixtures(17); }];
// MainPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        teams: getLeagueTeams(state),
    };
}

GloLoanCalculator.propTypes = {
    perMonthAmount: PropTypes.number.isRequired,
    apr: PropTypes.number.isRequired,
    loanAmount: PropTypes.number.isRequired,
    months: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
};
GloLoanCalculator.defaultProps = {
    perMonthAmount: 250,
    apr: 10,
    loanAmount: 1000,
    months: 6
};

GloLoanCalculator.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};