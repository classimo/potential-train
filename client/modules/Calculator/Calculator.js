import React, { PropTypes } from 'react';
import Container from  '../../scripts/Container';
import Title from '../../scripts/Title';
import APRInput from '../../scripts/APRInput';
import LoanAmountInput from '../../scripts/LoanAmountInput';
import MonthsAmountInput from '../../scripts/MonthsInput';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

// Import Selectors
import { getCalculatedValues } from './CalculatorReducer';
import { getIsLoanAmount } from './CalculatorReducer';

injectTapEventPlugin();

class GloLoanCalculator extends React.Component{
    componentDidMount() {
        this.props.dispatch(fetchLeagueTeams(70));
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
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
        <Paper zDepth={1} >
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
        calculated: getCalculatedValues(state),
        isLoanAmount: getIsLoanAmount(state)
    };
}

GloLoanCalculator.propTypes = {
    perMonthAmount: PropTypes.number.isRequired,
    apr: PropTypes.number.isRequired,
    loanAmount: PropTypes.number.isRequired,
    months: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
};

GloLoanCalculator.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(GloLoanCalculator);