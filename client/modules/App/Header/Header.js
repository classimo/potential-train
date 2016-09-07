/**
 * Created by paulius on 07/09/16.
 */
import React, { PropTypes } from 'react';

// import Logo from '../Logo/Logo';


// Import Style
import styles from './Header.css';

export function Header(props) {
  return (
        <div className={styles.Header}>
            <div className={styles.menu}>
                <ul>
                    {/* <Logo />*/}
                    {/* <li><FormattedMessage id="switchLanguage" /></li> */}
                    {/* {languageNodes}*/}
                    <li className={styles.selected}>menu 1</li>
                    <li>menu 2</li>
                    <li>menu 3</li>
                    <li>menu 4</li>
                </ul>
            </div>
        </div>
    );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {

};

export default Header;
