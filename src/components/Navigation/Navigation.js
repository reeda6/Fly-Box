/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Navigation.css';
import Link from '../Link';

// const UserContext = React.createContext({
//   theme: themes.dark,
//   toggleTheme: () => {},
// });

const mapStateToProps = (state) => {
  return {
      username : state.runtime.username,
  };
}
class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    signedIn: PropTypes.bool,
  };

  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.mybutton} to="/about">
          About
        </Link>
        <span className={s.spacer}> | </span>
        <Link className={s.mybutton} to="/contact">
          Contact
        </Link>

        {this.props.username ? (
          <>
            <span className={s.spacer}> | </span>
            <Link className={s.mybutton} to="/trips">
              View Trips
            </Link>
            <span className={s.spacerForOr}>or</span>
            <Link className={s.mybutton} to="/login">
              Log out
            </Link>
          </>
        ) : (
          <>
            <span className={s.spacer}> | </span>
            <Link className={s.mybutton} to="/login">
              Log in
            </Link>
            <span className={s.spacerForOr}>or</span>
            <Link className={s.mybutton} to="/register">
              Sign up
            </Link>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(s)(Navigation));
