
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logo from './Fish.png';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation />
          <Link className={s.brand} to="/">
            <img
              src={logo}
              srcSet={`${logo}`}
              width="160"
              height="100"
              alt="React"
              border-radius="25px"
              className={s.logo}
            />
          </Link>
          <div className={s.banner}>
            <p className={s.bannerTitle}>Fly Box</p>
            <p className={s.bannerDesc}>
              <em>More fish, less work</em>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
