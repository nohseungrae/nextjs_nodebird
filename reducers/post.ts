import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../types/post.types";

export const initialState = {
  //시퀄라이즈와 관련있음 -- 기본 속성이 아닌 데이터를 합쳐서 리턴해주는 경우 첫글자가 대문자이다.
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "nolec",
      },
      content: "첫 번쨰 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://newsimg.sedaily.com/2019/01/23/1VE5F3W5WP_18.png",
        },
        {
          src: "https://newsimg.sedaily.com/2019/01/23/1VE5F3W5WP_18.png",
        },
        {
          src:
            "data:image/webp;base64,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",
        },
      ],
      Comments: [{ User: { nickname: "zero" }, content: "hello" }],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: { id: 1, nickname: "nolec" },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostError: null,
        addPostDone: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentError: null,
        addCommentDone: false,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};
export default reducer;
