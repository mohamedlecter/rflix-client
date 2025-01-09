import axios from "axios";
import { API_KEY, BASE_URL } from "../../services/tmdbApi";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const signin = (username, password, navigate) => async (dispatch) => {
  try {
    // Step 1: Request a new token
    const tokenResponse = await axios.get(
      `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
    const token = tokenResponse.data.request_token;

    // Step 2: Validate the token with username and password
    await axios.post(
      `${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`,
      {
        username,
        password,
        request_token: token,
      }
    );

    // Step 3: Create a session
    const sessionResponse = await axios.post(
      `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      {
        request_token: token,
      }
    );

    const sessionId = sessionResponse.data.session_id;

    // Step 4: Dispatch sign-in action
    dispatch({
      type: SIGN_IN,
      payload: { sessionId },
    });

    console.log("sessionId", sessionId);

    // Redirect to home page
    navigate("/");
  } catch (error) {
    console.error("Sign-in failed:", error);
    alert("Authentication failed. Please check your credentials.");
  }
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
  });
};
