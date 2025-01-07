import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
});

export default store;
