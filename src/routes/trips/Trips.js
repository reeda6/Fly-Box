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
import { blobToBase64String } from 'blob-util';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Auth, API, Storage } from 'aws-amplify';
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

import { s3Upload } from '../../../libs/awsLib';
import s from './Trips.css';

const mapStateToProps = state => ({
  username: state.runtime.username,
  userSub: state.runtime.userSub,
  newUser: state.runtime.newUser,
});

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={3} defaultCenter={{ lat: 36.1627, lng: -86.7816 }}>
      {// props.isMarkerShown &&
      props.coordinateArray.map(entry => (
        <Marker
          key={entry[0]}
          position={{
            lat: entry[0],
            lng: entry[1],
          }}
        />
      ))}
    </GoogleMap>
  )),
);

class Trips extends React.Component {
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
      tripName: '',
      tripDescription: '',
      newUser: null,
      markerShown: false,
      imageUrl: '',
    };
  }

  componentDidMount() {
    if (!this.props.newUser) {
      API.get('fb-dev-api-2', `/listTrips/${this.props.userSub}`)
        .then(res => {
          console.log('res is', res);
          const tripsSortedByTime = res.sort(
            (a, b) => a.createdAt - b.createdAt,
          );
          console.log(tripsSortedByTime);
          const lastTrip = tripsSortedByTime[tripsSortedByTime.length - 1];

          this.setState({
            tripName: lastTrip.tripId,
            tripDescription: lastTrip.text,
            coordinateArray: lastTrip.coordinates,
            imageUrl: lastTrip.imageUrl,
          });
        })
        .catch(err => console.log(err));
    }
    // axios
    //   .post(
    //     'https://azx5o5noa7.execute-api.us-east-1.amazonaws.com/dev/readUsers',
    //     {
    //       email: this.props.username,
    //     },
    //   )
    //   .then(userData => {
    //     console.log(userData);
    //     this.setState({
    //       coordinateArray: userData.data.Item.coordinateArray.L,
    //     });
    //     console.log(this.state.coordinateArray);
    //   })
    //   .catch(err => console.log(err));
  }

  onImageDrop(file) {
    this.setState({
      pictureString: file[0],
    });

    // s3Upload(file[0])
    //   .then((attachment)=>{
    //   Storage.vault.get(attachment)
    //     .then((imageUrl)=>{
    //       this.setState({
    //         imageUrl
    //       })
    //       console.log(this.state.imageUrl)
    //     })
    //   })
    //   .catch((err)=> console.log(err));

    // await this.createNote({
    //   attachment,
    //   content: this.state.content
    // });
    // this.props.history.push("/");

    // blobToBase64String(file[0])
    //   .then(base64String => {
    //     console.log('this is string ', base64String);
    //     this.setState({
    //       pictureString: base64String,
    //     });
    //     const data = JSON.stringify(this.state.pictureString);
    //     let attachmentURL;
    //   const note = await this.getNote();
    //   const { content, attachment } = note;

    //   if (attachment) {
    //     attachmentURL = await Storage.vault.get(attachment);
    //   }
    //     // axios.post(
    //     //     'https://azx5o5noa7.execute-api.us-east-1.amazonaws.com/dev/requestUploadURL',
    //     //     data,
    //     //     {
    //     //       headers: {
    //     //         'Content-Type': 'text/text',
    //     //         imageName: this.state.tripName
    //     //       },
    //     //     },
    //     //   )
    //     //   .then(param => {
    //     //     axios
    //     //       .post(
    //     //         'https://azx5o5noa7.execute-api.us-east-1.amazonaws.com/dev/getImages',
    //     //         {
    //     //           email: this.state.tripName,
    //     //         },
    //     //       )
    //     //       .then(obj => {
    //     //         this.setState({
    //     //           retrievedString: Buffer.from(obj.data.objData.data).toString(
    //     //             'utf-8',
    //     //           ),
    //     //         }, console.log(
    //     //           'this is the url u want ',
    //     //           this.state.retrievedString
    //     //         ));

    //     //       });
    //     //   })
    //     //   .catch(err => console.log(err));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  handleAddTrip = async event => {
    event.preventDefault();

    const data = new FormData(event.target);
    s3Upload(this.state.pictureString)
      .then(attachment => {
        Storage.vault.get(attachment).then(imageUrl => {
          // this.setState({
          //   imageUrl
          // })
          // console.log(this.state.imageUrl)
          // console.log('this is event', event);
          var pair = data.entries();
          let tripName,
            tripDescription = '';
          let count = 0;
          let coordinate1 = [];
          console.log('this is data', data);

          for (var pair of data.entries()) {
            count == 0 && (tripName = pair[1]);
            count == 1 && (tripDescription = pair[1]);
            count == 2 && (coordinate1 = pair[1]);
            // (password1 = pair[1]);
            console.log(coordinate1);
            count++;
          }
          this.setState(
            {
              tripName,
              tripDescription,
              coordinateArray: JSON.parse(coordinate1),
              imageUrl,
            },
            () => {
              try {
                console.log(typeof this.state.coordinateArray);
                console.log(
                  'before users post ',
                  this.state.tripName,
                  ' ',
                  this.state.tripDescription,
                  ' ',
                  this.props.username,
                  ' ',
                  this.state.coordinateArray,
                );
                API.post('fb-dev-api-2', '/create', {
                  body: {
                    cognitoIdentityId: this.props.userSub,
                    tripName: this.state.tripName,
                    text: this.state.tripDescription,
                    coordinateArray: this.state.coordinateArray,
                    imageUrl: this.state.imageUrl,
                  },
                })
                  .then(res => console.log(res))
                  .catch(err => console.log(err));
                //   axios
                //     .post(
                //       ' https://azx5o5noa7.execute-api.us-east-1.amazonaws.com/dev/writeUsers',
                //       {
                //         text: this.state.tripName+'\n'+this.state.tripDescription,
                //         url: this.state.tripName,
                //         email: this.props.username,//NEEDS TO CHANGE
                //         coordinateArray: this.state.coordinateArray
                //       },
                //     )
                //     .then(res =>{
                //       console.log('react is good to go', res);
                //       this.setState(
                //         {
                //           markerShown: true
                //         });
              } catch (e) {
                alert(e.message);
              }
            },
          );
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>{this.props.title}</h1>

          <hr />

          <h1 className={s.head}>Add Trip</h1>
          <form onSubmit={this.handleAddTrip} className={s.largeForm}>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="usernameOrEmail">
                Trip name:
              </label>
              <br />
              <textarea
                className={s.inputSmall}
                id="usernameOrEmail"
                type="text"
                name="usernameOrEmail"
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Trip description:
              </label>
              <br />
              <textarea
                className={s.inputLarge}
                id="password"
                type="text"
                name="password"
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="coordinates">
                Enter coordinates in array of arrays:
              </label>
              <br />
              <textarea
                className={s.inputSmall}
                id="coordinates"
                type="text"
                name="coordinates"
              />
            </div>
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}
              className={s.dropzone}
            >
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
            <div className={s.formGroup}>
              <button className="btn btn-secondary-outlined">Add trip</button>
            </div>
          </form>

          {/* <button
            onClick={() => {
              console.log('before users post ', this.state.tripName,' ', this.state.tripDescription,' ', this.props.username,' ', this.state.coordinateArray)
              axios
                .post(
                  'https://azx5o5noa7.execute-api.us-east-1.amazonaws.com/dev/users',
                  {
                    text: this.state.tripName+'\n'+this.state.tripDescription,
                    url: this.state.tripName,
                    email: this.props.username,
                    coordinateArray: this.state.coordinateArray
                  },
                )
                .then(res => console.log('react is good to go', res))
                .catch(err => console.log(err));
            }}
          >
            click me to test user creation
          </button> */}

          <hr />

          {this.state.tripName && (
            <>
              <h1 className={s.head}>My Recent Trip</h1>
              {this.state.tripName && (
                <h3 className={s.tripName}>{this.state.tripName}</h3>
              )}
              {this.state.tripDescription && (
                <h3 className={s.tripDescription}>
                  {this.state.tripDescription}
                </h3>
              )}

              <img
                className={s.tripPic}
                src={this.state.imageUrl}
                alt="mypic"
              />
              <MyMapComponent
                isMarkerShown={this.state.markerShown}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                coordinateArray={this.state.coordinateArray}
                className={s.mapComponent}
              />
              <hr />
            </>
          )}
          <h1 className={s.head}>My Other Trips</h1>
          <div className="row">
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Bahamas</h5>
                  <p className="card-text">Bonefish excursion</p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Hello%20again"
                    className="btn btn-secondary"
                  >
                    Click here to view or share
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Rocky Mountains</h5>
                  <p className="card-text">Rainbow trout in shallow waters</p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Hello%20again"
                    target="_top"
                    className="btn btn-secondary"
                  >
                    Click here to view or share
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Alaska</h5>
                  <p className="card-text">Coho salmon off egg fly pattern</p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Hello%20again"
                    target="_top"
                    className="btn btn-secondary"
                  >
                    Click here to view or share
                  </a>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <h1 className={s.head}>My Friends' Trips</h1>
          <div className="row">
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Jim's Hawaii Trip</h5>
                  <p className="card-text">Sailfish fishing</p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Error"
                    className="btn btn-secondary"
                  >
                    Click here!
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Alex's Adirondack Adventure</h5>
                  <p className="card-text">Brown trout off bank</p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Partnership"
                    target="_top"
                    className="btn btn-secondary"
                  >
                    Click here!
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className={s.cardcontainer}>
                <div className="card-body">
                  <h5 className="card-title">Ann's Bass Excursion</h5>
                  <p className="card-text">Florida lake topwater bass</p>
                  <a
                    href="mailto:alexjreed7@gmail.com?Subject=Story"
                    target="_top"
                    className="btn btn-secondary"
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

export default connect(mapStateToProps)(withStyles(s, bootstrap)(Trips));
