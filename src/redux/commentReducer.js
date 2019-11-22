import axios from "axios";

const initialState = {
  comments: {
    comment_id: 0,
    post_id: 0,
    user_id: 0,
    comment: ""
  }
};

const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENTS = "GET_COMMENTS";
const DELETE_COMMENT = "DELETE_COMMENT";

export function addComment(user_id, post_id, comment) {
  let add = axios
    .post("/api/comment", { user_id, post_id, comment })
    .then(res => {
      return res.data;
    });
  return {
    type: ADD_COMMENT,
    payload: add
  };
}

export function getComments(post_id) {
  let get = axios.get(`/api/comment/${post_id}`).then(res => res.data);
  return {
    type: GET_COMMENTS,
    payload: get
  };
}

export function deleteComment(comment_id) {
  let gone = axios.delete(`/api/comment/${comment_id}`).then(res => res.data);
  return {
    type: DELETE_COMMENT,
    payload: gone
  };
}

export default function commentReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_COMMENT + "_FULFILLED":
      return { ...state, comment: payload };
    case DELETE_COMMENT + "_FULFILLED":
      return { ...state, comment: payload };
    case GET_COMMENTS + "_FULFILLED":
      return { ...state, comment: payload };
    default:
      return state;
  }
}
