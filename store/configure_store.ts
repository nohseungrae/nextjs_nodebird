import { createWrapper, MakeStore } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, compose, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
// import thunkMiddleware from "redux-thunk";
import createSaraMiddleware from "redux-saga";
import "redux";
import { Task } from "redux-saga";

declare module "redux" {
  export interface Store {
    sagaTask?: Task;
  }
}

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

//히스토리가 쌓이면 메모리도 많이 먹고 중앙데이터가 다 보이기 때문에 보안에 취약할 수 있으므로 다르게 적용
const configureStore: MakeStore<Store<any, AnyAction>> = () => {
  //리덕스에 기능을 추가해주는!!
  const sagaMiddleware = createSaraMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store: Store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
