import { all, fork } from "redux-saga/effects";
import axios from "axios";
import postSaga from "./post";
import userSaga from "./user";
// import { backUrl } from "../config/config";

// axios.defaults.baseURL = backUrl;
// axios.defaults.withCredentials = true;

//generator!! -- 특별한 역할을 하는 함수!! .next()붙여야 됌!
export default function* rootSaga() {
  // all 은 배열을 받고 받는 걸 한방에 실행시켜준다.
  // fork -> 함수를 실행한다. call -> 함수를 실행한다. * 둘의 차이점이 존재함
  // fork - 비동기 호출 , call - 동기 호출
  yield all([fork(postSaga), fork(userSaga)]);
}

// call - axios~~then~~ yield
// fork - await axios -
