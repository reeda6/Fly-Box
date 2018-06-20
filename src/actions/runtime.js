/* eslint-disable import/prefer-default-export */

import { SET_RUNTIME_VARIABLE, LOG_IN } from '../constants';
import {Auth} from 'aws-amplify';

//const LOG_IN = 'LOG_IN' //MOVE TO CONSTANTS

export function setRuntimeVariable({ name, value }) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}

const logIn = (username)=> { 
  console.log('username from login',username);
  return { 
    type: LOG_IN,
    payload:{username}
  };
}

export function logInAsync(username) {
  return dispatch => {
    // (username)
      console.log('this is from actions folder', username)
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(logIn(username));

      //really need this
      //Auth.signIn(this.state.email, this.state.password).

      //   Auth.signUp({
    //     username,
    //     password
    //   }).then((newUser)=>{
    //     // console.log(newUser);
    //   dispatch(signUp());
    // }, 1000);
  // })
  }
}
