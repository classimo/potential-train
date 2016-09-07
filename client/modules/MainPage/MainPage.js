/**
 * Created by paulius on 07/09/16.
 */

import React, { PropTypes, Component } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Calculator from '../../components/Calculator/Calculator';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class MainPage extends Component {
    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }
  render() {
    const defaultCalculatorValues = {
      perMonthAmount: 250,
      apr: 10,
      loanAmount: 1000,
      termMonths: 6,
      isLoanAmount: true,
    };
    return (
            <Container>
                <Paper zDepth={1}>
                    <Row>
                        <Col md="8">
                            <Calculator calculator={defaultCalculatorValues} />
                        </Col>
                        <Col md="4">
                            <Paper zDepth={1} />
                        </Col>
                    </Row>
                </Paper>
            </Container>
        );
  }
}
MainPage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};