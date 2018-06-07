/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './FacePay.png';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation />
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl}`}
              width="170"
              height="50"
              alt="React"
            />
          </Link>
          <div className={s.banner}>
            <p className={s.bannerTitle}>Fly Box</p>
            <p className={s.bannerDesc}>
              <em>Change the way you pay!</em>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
