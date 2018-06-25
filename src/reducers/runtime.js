import { SET_RUNTIME_VARIABLE, LOG_IN } from '../constants';

export default function runtime(state = {}, action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return {
        state,
        [action.payload.name]: action.payload.value,
      };

    case LOG_IN:
      console.log('from LOG_IN', action.payload.username);
      return {
        ...state,
        username: action.payload.username,
        userSub: action.payload.userSub,
        newUser: action.payload.newUser,
      };
    default:
      return state;
  }
}
