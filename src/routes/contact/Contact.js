/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

import s from './Contact.css';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.head}>{this.props.title}</h1>
          <div className="row">
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Technical Support</h5>
                  <p className="card-text">
                    Is something on our application not working properly?
                  </p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Hello%20again"
                    className="btn btn-primary"
                  >
                    Click here!
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Business and Partnerships</h5>
                  <p className="card-text">
                    Are you interested in parterning with Fly Box?
                  </p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Hello%20again"
                    target="_top"
                    className="btn btn-primary"
                  >
                    Click here!
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Press</h5>
                  <p className="card-text">
                    Are you looking to write a story about FacePay?
                  </p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Hello%20again"
                    target="_top"
                    className="btn btn-primary"
                  >
                    Click here!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div className="row">
//   <button className={s.button}>Large</button>
//   <button className={s.button}>Large</button>
// </div>

export default withStyles(s, bootstrap)(Contact);
