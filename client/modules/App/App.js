/**
 * Created by paulius on 05/09/16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

// Import Actions

// Import Selectors

class IndexPage extends Component {

    componentDidMount(){

    }

    render() {
        return(
            <Container>
                <Row>
                    <Col md="8">
                    </Col>
                    <Col md="4">
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(IndexPage);