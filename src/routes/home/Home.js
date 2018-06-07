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
import { Row, Col } from 'react-bootstrap';
import s from './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col xs={2} md={2} mdOffset={2} />
          <Col className={s.trythis} xs={12} md={8} mdOffset={2} />
        </Row>
        <div className={s.container}>
          <h1>React.js</h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
