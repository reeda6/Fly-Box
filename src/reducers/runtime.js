import { SET_RUNTIME_VARIABLE, LOG_IN } from '../constants';

export default function runtime(state = false, action) {
  switch (action.type) {
    // case SET_RUNTIME_VARIABLE:
    //   return {
    //     state,
    //     [action.payload.name]: action.payload.value,
    //   };

    case LOG_IN:
      return true;
    default:
      return state;
  }
}
