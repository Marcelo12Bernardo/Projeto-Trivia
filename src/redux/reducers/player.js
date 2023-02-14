import { GET_EMAIL, GET_NAME, GET_SCORE, GET_ASSERTIONS, RESET_STATE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL:
    return {
      ...state, gravatarEmail: action.payload,
    };
  case GET_NAME:
    return {
      ...state, name: action.payload,
    };
  case GET_SCORE:
    return {
      ...state, score: action.payload + state.score,
    };
  case GET_ASSERTIONS:
    return {
      ...state, assertions: action.payload + state.assertions,
    };
  case RESET_STATE:
    return {
      name: action.payload.name,
      assertions: action.payload.assertions,
      score: action.payload.score,
      gravatarEmail: action.payload.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
