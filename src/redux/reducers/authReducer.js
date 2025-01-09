import { SIGN_IN, SIGN_OUT } from "../actions/authActions";

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  sessionId: localStorage.getItem("sessionId") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("sessionId", action.payload.sessionId);
      return {
        ...state,
        isAuthenticated: true,
        sessionId: action.payload.sessionId,
      };
    case SIGN_OUT:
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("sessionId");
      return {
        ...state,
        isAuthenticated: false,
        sessionId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
