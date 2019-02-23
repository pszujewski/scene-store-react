const initialState = {
  user: null,
}

const ADD_USER = "ADD_USER";

export const addUser = user => ({
  type: ADD_USER,
  payload: user,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
