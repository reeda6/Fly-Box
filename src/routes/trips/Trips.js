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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";


import s from './Trips.css';

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 36.1627, lng: -86.7816 }}
  >
    {props.isMarkerShown && props.coordinateArray.map(entry => {
      return <Marker key={parseInt(entry.L[0].N)} position={{ lat: parseInt(entry.L[0].N), lng: parseInt(entry.L[1].N) }} />
    })}
  </GoogleMap>
)))

class Trips extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { pictures: [], name: 'alex', pictureString: null, coordinateArray: [], retrievedString: null, email:null,
    isLoading: false,
    email: '',
    password: '',
    tripName: '',
    tripDescription: '',
    newUser: null };
  }

  componentDidMount() {
    axios.post('https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/readUsers', {
      email: "alexander.j.reed@accenture.com"
    })
      .then((userData) => {
        console.log(userData)
        this.setState({
          coordinateArray: userData.data.Item.coordinateArray.L,
          email: "alexander.j.reed@accenture.com"
        });
        console.log(this.state.coordinateArray);
      })
      .catch((err) => console.log(err));

  }

  onImageDrop(file) {
    this.setState({
      pictureString: file[0],
    });
    blobToBase64String(file[0]).then((base64String) => {
      console.log('this is string ', base64String)
      this.setState({
        pictureString: (base64String)
      })
      let data = JSON.stringify(this.state.pictureString)
      axios.post('https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/requestUploadURL',
        data, {
          headers: {
            'Content-Type': 'text/text',
            'imageName': this.state.email
          }
        })
        .then((param) => {
          axios.post('https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/getImages',
            {
              email: this.state.email
            })
            .then((obj) => {
              this.setState({
                retrievedString: Buffer.from(obj.data.objData.data).toString('utf-8')
              })
              console.log('this is the url u want ', Buffer.from(obj.data.objData.data).toString('base64'));
            })
        })
        .catch((err) => console.log(err));
    }).catch(function (err) {
      console.log(err)
    });
  }

  handleAddTrip= async event => {
    event.preventDefault();
    console.log('this is event',event)
    const data = new FormData(event.target);
    var pair= data.entries();
    var email1 = pair[0];
    var password1 = pair[1];
    var count=0;
    console.log('this is data',data)

    for (var pair of data.entries()) {
      count==0? email1=pair[1] : password1=pair[1];
      console.log(pair);
      count++; 
    }  
        this.setState({
        tripName: email1,
        tripDescription: password1        
      }, 
      ()=>{
      try {
      
      axios.post('https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/users', {
        text: this.state.tripDescription,
        tripName: this.state.tripName 
      }).then((res) => console.log('react is good to go', res))
        .catch((err) => console.log(err))
      console.log(this.state.tripName, this.state.tripDescription);
    } catch (e) {
        alert(e.message);
      }
    })
  
  }

  handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>

          <h1 className={s.head}>{this.props.title}</h1>
          <h1 className={s.head}>My Trip</h1>
          {this.state.tripName && <h3>{this.state.tripName}</h3>}
          {this.state.retrievedString && <img src={'data:image/jpeg;base64,' + this.state.retrievedString} alt='mypic' />}
          {this.state.tripDescription && <h3>{this.state.tripDescription}</h3>}
          <MyMapComponent isMarkerShown={true}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            coordinateArray={this.state.coordinateArray}
          />

          <h1 className={s.head}>Add Trip</h1>

          {/* <form onSubmit={this.handleAddTrip}>
            {/*<FormGroup bsSize="large">
               <ControlLabel>Name of your trip</ControlLabel>
              <FormControl autoFocus type="tel" value={this.state.tripName} onChange={this.handleChange} />
              <ControlLabel>Description of your trip</ControlLabel>
              <FormControl autoFocus  value={this.state.tripDescription} onChange={this.handleChange} /> 
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="email" placeholder="Description"/>
                <label htmlFor="password">Example textarea</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>         
            <button type="submit">Confirm</button>
          </form> */}

           <form onSubmit={this.handleAddTrip}>
            <div className={s.formGroup} >
              <label className={s.label} htmlFor="usernameOrEmail">
                Trip name:
                </label>
                <br/>
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
              <br/>
              <textarea
                className={s.inputLarge}
                id="password"
                type="text"
                name="password"
              />
            </div>
            <div className={s.formGroup}>
              <button className="btn btn-primary-outlined">
                Add trip
              </button>
            </div>
          </form>

          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
          <button onClick={() => {
            axios.post('https://hro28vpqla.execute-api.us-east-1.amazonaws.com/dev/users', {
              text: 'test from react',
              url: 'cool beans'
            }).then((res) => console.log('react is good to go', res))
              .catch((err) => console.log(err))
          }}>
            click me to test user creation
          </button>

          
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
                    Are you interested in parterning with FacePay?
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
                    Are you interested in parterning with FacePay?
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

export default withStyles(s, bootstrap)(Trips);
