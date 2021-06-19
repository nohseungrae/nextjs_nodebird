import produce from "immer";
import {
  ADD_POST_TO_ME,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_POST_OF_ME,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../types/user_types";

export const initialState = {
  followLoadding: false, //팔로우 시도중
  followDone: false,
  followError: null,
  unFollowLoadding: false, //언팔로우 시도중
  unFollowDone: false,
  unFollowError: null,
  logInLoadding: false, //로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoadding: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoadding: false, //회원가입 시도중
  signUpDone: false,
  signUpError: null,
  isLoggedIn: false,
  changeNicknameLoadding: false, //닉네임변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
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
  Followings: [{ nickname: "라희" }, { nickname: "라비" }],
  Followers: [{ nickname: "라희" }, { nickname: "라비" }],
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FOLLOW_REQUEST:
        draft.followLoadding = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoadding = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoadding = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unFollowLoadding = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unFollowLoadding = false;
        draft.unFollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data
        );
        break;
      case UNFOLLOW_FAILURE:
        draft.unFollowLoadding = false;
        draft.unFollowError = action.error;
        break;
      case LOG_IN_REQUEST:
        console.log("reducer login");
        draft.logInLoadding = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoadding = false;
        draft.logInDone = true;
        draft.me = action.data;
        // draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoadding = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoadding = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoadding = true;
        draft.logOutDone = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoadding = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoadding = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoadding = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoadding = false;
        draft.signUpError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoadding = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: [{ id: action.data }, ...state.me.Posts],
      //   },
      // };
      case REMOVE_POST_OF_ME:
        draft.me.Posts.filter((v) => action.data !== v.id);
        break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: state.me.Posts.filter((v) => action.data !== v.id),
      //   },
      // };
      default:
        return state;
    }
  });
export default reducer;
