import axios from "axios";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

export const signIn = (username, password) => async (dispatch) => {
  try {
    // Step 1: Get a new request token
    const tokenResponse = await axios.get(
      `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
    const requestToken = tokenResponse.data.request_token;

    // Step 2: Validate the token with the username and password
    await axios.post(
      `${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`,
      {
        username,
        password,
        request_token: requestToken,
      }
    );

    // Step 3: Create a session
    const sessionResponse = await axios.post(
      `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      {
        request_token: requestToken,
      }
    );

    dispatch({ type: SIGN_IN, payload: sessionResponse.data.session_id });
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const signOut = () => ({ type: SIGN_OUT });
