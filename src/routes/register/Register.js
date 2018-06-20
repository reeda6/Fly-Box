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
  callSignInThunk: (username, password) =>
    dispatch(logInAsync(username, password)),
});

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
      confirmationCode: '',
      newUser: null,
    };
  }

  // getCoordinates(){
  //   axios.post('https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/users',{
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

  componentDidMount() {
    // axios.post('https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/readUsers', {
    //   email: "alex@email"
    // })
    //   .then((userData) => {
    //     this.setState({
    //       coordinateArray: userData.data.Item.coordinateArray.L,
    //       email: "alex@email"
    //     });
    //     console.log(this.state.coordinateArray);
    //   })
    //   .catch((err) => console.log(err));
    // console.log([0, 1]);
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

              this.props
                .callSignInThunk(this.state.email, this.state.password)
                .then(resp => console.log(resp));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  onImageDrop(file) {
    this.setState({
      pictureString: file[0],
      // pictureURL: URL.createObjectURL(file[0])
    });

    // 'data:image/jpeg;base64, '+
    blobToBase64String(file[0])
      .then(base64String => {
        console.log('this is string ', base64String);
        this.setState({
          pictureString: base64String,
        });
        console.log('this is state string ', this.state.pictureString);

        const data = JSON.stringify(this.state.pictureString);
        console.log('this is the data', data);
        axios
          .post(
            'https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/requestUploadURL',
            data,
            {
              headers: {
                'Content-Type': 'text/text',
              },
            },
          )
          .then(param => {
            console.log('lambda worked\n\n\n\n\n', param);
            // let headers= {'Content-Type':'text/text'}
            // let data=JSON.stringify(this.state.pictureString)

            console.log('picture string is this', this.state.pictureString);

            axios
              .get(
                'https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/getImages',
                {
                  email: this.state.email,
                },
              )
              .then(obj => {
                this.setState({
                  retrievedString: Buffer.from(obj.data.objData.data).toString(
                    'utf-8',
                  ),
                });
                console.log(
                  'this is the url u want ',
                  Buffer.from(obj.data.objData.data).toString('base64'),
                );
              });
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div className={s.root} ref="myRef">
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>...</p>

          <button onClick={this.props.callSignInThunk}>
            Click this to test callSignInThunk
          </button>

          <form onSubmit={this.handleSubmit}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="usernameOrEmail">
                Email address:
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
                <input
                  className={s.input}
                  id="password"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <div className={s.formGroup}>
              <button className={s.button}>Sign up</button>
            </div>
          </form>
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
            <button>Confirm</button>
          </form>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
          >
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
          <button
            onClick={() => {
              axios
                .post(
                  'https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/users',
                  {
                    text: 'test from react',
                    url: 'cool beans',
                  },
                )
                .then(res => console.log('react is good to go', res))
                .catch(err => console.log(err));
            }}
          >
            click me to test user creation
          </button>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            coordinateArray={this.state.coordinateArray}
          />
          {this.state.retrievedString && (
            <img
              src={`data:image/jpeg;base64,${this.state.retrievedString}`}
              alt="mypic"
            />
          )}
          {console.log(
            'this is the string the image is using',
            this.state.retrievedString,
          )}
          <div id="list">
            <h1>Uploaded Files:</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(withStyles(s)(Register));
