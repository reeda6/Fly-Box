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
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { blobToBase64String } from 'blob-util';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Auth } from 'aws-amplify';
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
  callSignInThunk: (username) => {
    console.log(username,'this is from callsigninthunk');
    dispatch(logInAsync(username))
  }
});

const mapStateToProps = (state) => {
  console.log('this is state from mapstate to props', state)
  return {
      username : state.runtime.username,
  };
}

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      name: 'alex',
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

  // getCoordinates(){
  //   axios.post('https://azx5o5noa7.execute-api.us-east-1.amazonaws.com/dev/users',{
  //     email:"alex@email"
  //   })
  //     .then((userData)=> console.log('this is my user data', userData))
  //     .catch((err)=> console.log(err));
  //   }

  //  MapWithAMarker(props){
  //    withGoogleMap(props =>
  //   <GoogleMap
  //     defaultZoom={8}
  //     defaultCenter={{ lat: -34.397, lng: 150.644 }}
  //   >
  //     <Marker
  //       position={{ lat: -34.397, lng: 150.644 }}
  //     />
  //   </GoogleMap>
  // )};

  // componentDidMount() {
  //   // axios.post('https://azx5o5noa7.execute-api.us-east-1.amazonaws.com/dev/readUsers', {
  //   //   email: "alex@email"
  //   // })
  //   //   .then((userData) => {
  //   //     this.setState({
  //   //       coordinateArray: userData.data.Item.coordinateArray.L,
  //   //       email: "alex@email"
  //   //     });
  //   //     console.log(this.state.coordinateArray);
  //   //   })
  //   //   .catch((err) => console.log(err));
  //   // console.log([0, 1]);
  // }

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
          console.log(
            this.state.email,
            ' this is email in handlesubmit',
            'this is email1',
            email1,
          );
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
            // })
          });
        } catch (e) {
          alert(e.message);
        }
      },
    );
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    // this.props.ca
    try {
      Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
        .then(() => {
          Auth.signIn(this.state.email, this.state.password)
            .then(() => {
              console.log('in confirm submit');

              this.props.callSignInThunk(this.state.email, this.state.password)
                .then(()=>{
                  this.setState({
                    confirmed:true
                  })
                }
                );
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
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
          {!(this.state.newUser) ? 
          <form onSubmit={this.handleSubmit}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="usernameOrEmail">
                Email address:
                <br/>
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
                <br/>
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
          :
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
          }
          
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Register));
