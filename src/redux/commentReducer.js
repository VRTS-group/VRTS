import axios from "axios";

const initialState = {
  comments: [],
  comment_id: 0,
  post_id: 0,
  user_id: 0,
  comment: ""
};

const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

export function addComment(user_id, post_id, comment) {
  let add = axios
    .post("/auth/addComment", { user_id, post_id, comment })
    .then(res => {
      return res.data;
    });
  return {
    type: ADD_COMMENT,
    payload: add
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
      return payload;
    default:
      return state;
  }
}
