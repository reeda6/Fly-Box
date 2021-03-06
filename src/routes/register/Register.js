import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { blobToBase64String } from 'blob-util';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Auth, API } from 'aws-amplify';
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from 'react-google-maps';

import s from './Register.css';
import { logInAsync } from '../../actions/runtime';
import history from '../../history';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={3} defaultCenter={{ lat: 36.1627, lng: -86.7816 }}>
      {props.isMarkerShown &&
        props.coordinateArray.map(entry => (
          <Marker
            key={parseInt(entry.L[0].N)}
            position={{
              lat: parseInt(entry.L[0].N),
              lng: parseInt(entry.L[1].N),
            }}
          />
        ))}
    </GoogleMap>
  )),
);

const mapDispatchToProps = dispatch => ({
  callSignInThunk: (username, userSub, newUser) => {
    console.log(userSub, 'this is sub from callsigninthunk');
    dispatch(logInAsync(username, userSub, newUser));
  },
});

const mapStateToProps = state => {
  console.log('this is state from mapstate to props', state);
  return {
    username: state.runtime.username,
    userSub: state.runtime.userSub,
    newUser: state.runtime.newUser,
  };
};

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      pictureString: null,
      coordinateArray: [],
      retrievedString: null,
      email: null,
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmed: false,
      newUser: null,
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.target);
    var pair = data.entries();
    let email1 = pair[0];
    let password1 = pair[1];
    let count = 0;
    for (var pair of data.entries()) {
      count == 0 ? (email1 = pair[1]) : (password1 = pair[1]);
      count++;
    }
    this.setState(
      {
        email: email1,
        password: password1,
      },
      () => {
        try {
          Auth.signUp({
            username: this.state.email,
            password: this.state.password,
            attributes: {
              email: this.state.email,
            },
          }).then(newUser => {
            console.log(newUser);
            this.setState({
              newUser,
            });
          });
        } catch (e) {
          console.log(e.message);
        }
      },
    );
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
      Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
        .then(() => {
          Auth.signIn(this.state.email, this.state.password)
            .then(() => {
              console.log('in confirm submit');

              this.props
                .callSignInThunk(
                  this.state.email,
                  this.state.newUser.userSub,
                  true,
                )
                .then(() => {
                  this.setState({
                    confirmed: true,
                  });
                });
            })
            .catch(err => console.log(err.message));
        })
        .catch(err => console.log(err.message));
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div className={s.root} ref="myRef">
        <div className={s.container}>
          <h1 className={s.head}>{this.props.title}</h1>

          {this.props.username && <h3>Logged In!</h3>}
          {!this.state.newUser ? (
            <form onSubmit={this.handleSubmit}>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="usernameOrEmail">
                  Email address:
                  <br />
                  <input
                    className={s.input}
                    id="usernameOrEmail"
                    type="text"
                    name="usernameOrEmail"
                    autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  />
                </label>
              </div>
              <div className={s.formGroup}>
                <label className={s.label} htmlFor="password">
                  Password:
                  <br />
                  <input
                    className={s.input}
                    id="password"
                    type="password"
                    name="password"
                  />
                </label>
              </div>
              <div className={s.formGroup}>
                <button className="btn button-secondary">Sign up</button>
              </div>
            </form>
          ) : (
            <form onSubmit={this.handleConfirmationSubmit}>
              <FormGroup controlId="confirmationCode" bsSize="large">
                <ControlLabel>Confirmation Code</ControlLabel>
                <FormControl
                  autoFocus
                  type="tel"
                  value={this.state.confirmationCode}
                  onChange={this.handleChange}
                />
                <HelpBlock>Please check your email for the code.</HelpBlock>
              </FormGroup>
              <button className="btn button-secondary">Confirm</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(Register),
);
