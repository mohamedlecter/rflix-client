import { SIGN_IN, SIGN_OUT } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  sessionId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isAuthenticated: true, sessionId: action.payload };
    case SIGN_OUT:
      return { ...state, isAuthenticated: false, sessionId: null };
    default:
      return state;
  }
};

export default authReducer;
