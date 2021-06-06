import { all, fork } from "redux-saga/effects";
import axios from "axios";

// import postSaga from "./post";
// import userSaga from "./user";
// import { backUrl } from "../config/config";

// axios.defaults.baseURL = backUrl;
// axios.defaults.withCredentials = true;

//generator!! -- 특별한 역할을 하는 함수!! .next()붙여야 됌!
export default function* rootSaga() {
  //   yield all([fork(postSaga), fork(userSaga)]);
}
