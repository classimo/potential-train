import React from 'react';

// Import styles
import styles from './Title.css';

export default class BookDescription extends React.Component {
  render() {
    return (
            <div className="Title">
                <h3>{this.props.text}</h3>
            </div>
        );
  }
}
