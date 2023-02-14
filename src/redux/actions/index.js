export const GET_EMAIL = 'GET_EMAIL';
export const GET_NAME = 'GET_NAME';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const getAssertions = (payload) => ({
  type: GET_ASSERTIONS,
  payload,
});
