import axios from "axios";
import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import shortId from "shortid";
import { generateDummyPost } from "../reducers/post";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../types/post.types";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../types/user_types";
function* loadPost(action) {
  try {
    yield delay(10);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: error.response.data,
    });
  }
}
function* watchLoadPost() {
  //단점 !! REQUEST 는 요청이된다!! (응답만 차단) 그래서 Loading 으로 막아줬다.
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}
//------------------------------------------------
function addPostAPI(data) {
  return axios.post("/api/post", data);
}
function* addPost(action) {
  try {
    // const result = yield fork(addPostAPI, action.data);
    yield delay(2000);
    const id = Number(shortId.generate());
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (error) {
    //put을 디스패치라고 생각
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}
function* watchAddPost() {
  //action가 매개변수로 넘어간다.
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
//------------------------------------------------
function* removePost(action) {
  try {
    const id = Number(shortId.generate());
    yield delay(2000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: id,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
//------------------------------------------------
function addCommentAPI(data) {
  return axios.post("/api/comment", data);
}
function* addComment(action) {
  try {
    // const result = yield fork(addPostAPI, action.data);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    //put을 디스패치라고 생각
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}
function* watchCommentPost() {
  //action가 매개변수로 넘어간다.
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchCommentPost),
  ]);
}
