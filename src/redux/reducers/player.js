import { GET_EMAIL, GET_NAME, GET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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

  default:
    return state;
  }
};

export default player;
