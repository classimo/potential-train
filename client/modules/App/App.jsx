/**
 * Created by paulius on 05/09/16.
 */
import React, { PropTypes, Component } from 'react';
// import { connect } from 'react-redux';

// Import Components
import Helmet from 'react-helmet';
import Header from './Header/Header';
import Footer from './Footer/Footer';
// Import Actions

// Import Selectors

import style from './App.css';

export default class App extends Component {
  render() {
    return (
            <div>
                <Helmet
                  title="Glo Loan Calculator"
                  meta={[
                        { charset: 'utf-8' },
                    {
                      'http-equiv': 'X-UA-Compatible',
                      content: 'IE=edge',
                    },
                    {
                      name: 'viewport',
                      content: 'width=device-width, initial-scale=1',
                    },
                  ]}
                />
                <Header />
                    <section className="AppContainer">
                        {this.props.children}
                    </section>
                <Footer />
           </div>
        );
  }
}
