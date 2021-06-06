//getServerSideProps, getStaticlProps 가 생기면서 생긴 기능
import { HYDRATE } from "next-redux-wrapper";
import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

// (이전상태, 액션) => 다음상태 리턴
const rootReducer = combineReducers({
  //서버사이드 렌더링을 위해서 넣어줘야함
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return {
          ...state,
          ...action.payload,
        };

      //액션 말고 리덕스 초기화 할 때 실행이 되는데 default 를 리턴해줘야 오류가 안난다.
      default:
        return state;
    }
  },
  user,
  post,
});
export default rootReducer;
