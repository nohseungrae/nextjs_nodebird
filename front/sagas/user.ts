import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../types/user_types";
//------------------------------------------------
function* follow(action) {
  try {
    yield delay(2000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
//------------------------------------------------
function* unFollow(action) {
  try {
    yield delay(2000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}
function logInAPI(data) {
  return axios.post("/login", data);
}
// logInAPI(action.data) 일반적
// call(logInAPI, action.data) 특이점
function* logIn(action) {
  try {
    console.log("saga login");
    const result = yield call(logInAPI, action.data);

    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
      // data: result.data,
    });
  } catch (error) {
    //put을 디스패치라고 생각
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}
function* watchLogin() {
  //action가 매개변수로 넘어간다.
  //take - 일회성이다. ex) 한 번 로그인하고 로그아웃 하면 그 다음 이 리스너가 사라져있다.
  //그렇기 때문에 while을 사용 하지만 직관적이지 않기에 takeEvery를 사용
  //!!! 하지만 동시에 여러 번 눌리는 동작을 방지하기 위해 takeLatest를 사용한다.(마지막 것만 실행시켜준다. 완료되지 않은 것(응답만) 취소. 프론트에서만 그렇게 작동)
  // 그렇기에 서버에서도 제어를 해줘야한다.

  // 그걸 보조하기 위해 throttle - 시간 지정 가능(특수한 경우에만 사용하자 - DDOS 공격이 될 것 같은 경우에만, 스크롤 같은?)

  // 디바운싱 - 타자를 연달아 칠 경우 다 끝난 경우에 요청을 보낼 때(input에 타자를 칠 때마다 타이머를 설정)

  // while (true) {
  //   yield take("LOG_IN_REQUEST", logIn);
  // }
  // yield takeEvery("LOG_IN_REQUEST", logIn);
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
//------------------------------------------------
function logOutAPI() {
  return axios.post("/logout");
}
function* logOut() {
  try {
    // const result = yield fork(logOutAPI);
    yield delay(2000);
    yield put({
      type: LOG_OUT_SUCCESS,
      // data: result.data,
    });
  } catch (error) {
    //put을 디스패치라고 생각
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}
function* watchLogOut() {
  //action가 매개변수로 넘어간다.
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
//------------------------------------------------
function signUpAPI(data) {
  return axios.post("/user", data);
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    //put을 디스패치라고 생각
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}
function* watchSignUp() {
  //action가 매개변수로 넘어간다.
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
