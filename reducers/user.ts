import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../types/user_types";

export const initialState = {
  logInLoadding: false, //로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoadding: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoadding: false, //로그아웃 시도중
  signUpDone: false,
  signUpError: null,
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const dummyUser = (data) => ({
  ...data,
  nickname: "nolec",
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      console.log("reducer login");
      return {
        ...state,
        logInLoadding: true,
        logInError: null,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoadding: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoadding: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoadding: true,
        logOutError: null,
        logOutDone: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoadding: true,
        logOutDone: false,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoadding: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoadding: true,
        signUpError: null,
        signUpDone: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoadding: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoadding: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
