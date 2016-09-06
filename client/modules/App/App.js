/**
 * Created by paulius on 05/09/16.
 */
import React, { PropTypes, Component } from 'react';
//import { connect } from 'react-redux';

// Import Components
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Calculator from '../Calculator/Calculator';

// Import Actions

// Import Selectors

export default class App extends Component {
    render() {
        var defaultCalculatorValues = {
            perMonthAmount: 250,
            apr: 10,
            loanAmount: 1000,
            termMonths: 6,
            isLoanAmount: true,
        };
        return(
            <Container>
                <Row>
                    <Col md="8">
                        <Calculator calculator={defaultCalculatorValues}/>
                    </Col>
                    <Col md="4">
                    </Col>
                </Row>
            </Container>
        )
    }
}

//export default connect(Calculator);