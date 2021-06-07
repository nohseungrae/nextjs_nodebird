import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../types/post.types";

//------------------------------------------------
function addPostAPI(data) {
  return axios.post("/api/post", data);
}
function* addPost(action) {
  try {
    // const result = yield fork(addPostAPI, action.data);
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
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
function addCommentAPI(data) {
  return axios.post("/api/comment", data);
}
function* addComment(action) {
  try {
    // const result = yield fork(addPostAPI, action.data);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data,
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
  yield takeLatest(ADD_POST_REQUEST, addComment);
}

export default function* postSara() {
  yield all([fork(watchAddPost), fork(watchCommentPost)]);
}
