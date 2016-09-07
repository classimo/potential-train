import React, { PropTypes } from 'react';
import Container from './components/Container';
import Title from './components/Title/Title';
import APRInput from './components/APRInput';
import LoanAmountInput from './components/LoanAmountInput';
import MonthlyBudgetInput from './components/MonthlyBudgetInput';
import MonthsAmountInput from './components/MonthsInput';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TypeSwitch from './components/TypeSwitch';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

// Import Selectors
import { getCalculatedValues } from './CalculatorReducer';
import { getIsLoanAmount } from './CalculatorSwitchReducer';

// Import Actions
import { calculate, switchCalculatorType, fetchCalculatorType, fetchCalculatedValues } from './Actions';

injectTapEventPlugin();
import style from './Calculator.css';

class Calculator extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCalculatedValues(this.props.calculator));
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  switchType(isLoanAmount) {
    let isLA = false;
    if (isLoanAmount === 'loanAmount') {
      isLA = true;
    }
    this.props.dispatch(switchCalculatorType(isLA));
    const calculatorValues = this.props.calculator;
    calculatorValues.isLoanAmount = isLA;
    this.props.dispatch(calculate(calculatorValues));
  }
  onChange(key, value) {
    const calculatorValues = this.props.calculator;
    calculatorValues[key] = value;
    this.props.dispatch(calculate(calculatorValues));
  }
  render() {
    let loanAmountOrMonthlyBudgetInput = <LoanAmountInput loanAmount={this.props.calculator.loanAmount} onChange={this.onChange.bind(this)} />;
    if (!this.props.isLoanAmount) {
      loanAmountOrMonthlyBudgetInput = <MonthlyBudgetInput monthlyBudget={this.props.calculator.perMonthAmount} onChange={this.onChange.bind(this)} />;
    }
    return (
        <div className="Calculator">
            <Row>
                <Col md="9" xs="6">
                    <Title text="Loan calculator" />
                </Col>
                <Col md="3" xs="6">
                    <TypeSwitch isLoanAmount={this.props.calculator.isLoanAmount} switchType={this.switchType.bind(this)} />
                </Col>
            </Row>
            <Row>
                <Col md="4" xs="6">
                    {loanAmountOrMonthlyBudgetInput}
                </Col>

                <Col md="4" xs="6">
                    <MonthsAmountInput termInMonths={this.props.calculator.termMonths} onChange={this.onChange.bind(this)} />
                </Col>
                <Col md="4" xs="6">
                    <APRInput percentage={this.props.calculator.apr} onChange={this.onChange.bind(this)} />
                </Col>
            </Row>
            <div style={{ width: '100%', height: '20px' }} />
            <Row>
                <Col md="4"><h4>{this.props.isLoanAmount ? 'Monthly repayments' : 'Loan amount available'}</h4></Col>
                <Col md="3"><h4>Total amount to repay</h4></Col>
                <Col md="1"><h4>APR</h4></Col>
                <Col md="3"><h4>Total cost of credit</h4></Col>
            </Row>

            <Row>
                <Col md="4"><span>{this.props.isLoanAmount ? this.props.calculatedValues.monthlyPayment : this.props.calculatedValues.loanAmountAvailable}</span></Col>
                <Col md="3"><span>{this.props.calculatedValues.totalRepayment}</span></Col>
                <Col md="1"><span>{this.props.calculator.apr} %</span></Col>
                <Col md="3"><span>{this.props.calculatedValues.creditCharge}</span></Col>
            </Row>

        </div>
        );
  }
}
// Actions required to provide data for this component to render in sever side.
Calculator.need = [() => { return fetchCalculatedValues(this.props.calculator); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    calculatedValues: getCalculatedValues(state),
    isLoanAmount: getIsLoanAmount(state),
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
