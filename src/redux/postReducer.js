import axios from "axios";

const initialState = {
  posts: {
  post_id: 0,
  user_id: 0,
  media: "",
  title: "",
  description: "",
  tags: "",
  views: "",
  saves: false
  }
  
};

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const GET_POST_BY_ID = 'GET_POST_BY_ID';

export function getPost() {
  let get = axios.get(`/auth/getPosts`).then(res => {
    return res.data;
  });
  return {
    type: GET_POST,
    payload: get
  };
}

export function getPostById(id) {
  let get = axios.get(`/auth/getPostById/${id}`)
  .then(res => {
    return res.data
  });
  return{
    type: GET_POST_BY_ID,
    payload: get
  };
}

export function addPosts(
  user_id,
  media,
  title,
  description,
  tags,
  views,
  saves
) {
  let add = axios
    .post("/auth/addPosts", {
      user_id,
      media,
      title,
      description,
      tags,
      views,
      saves
    })
    .then(res => {
      return res.data;
    });
  return {
    type: ADD_POST,
    payload: add
  };
}

export function editPosts(id, title, description, tags) {
  let edit = axios
    .put(`/auth/editPosts/${id}`, { title, description, tags })
    .then(res => {
      return res.data;
    });
  return {
    type: EDIT_POST,
    payload: edit
  };
}

export function deletePosts(id) {
  let gone = axios.delete(`/auth/deletePosts/${id}`).then(res => res.data);
  return {
    type: DELETE_POST,
    payload: gone
  };
}

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POST + "_FULFILLED":
      return { post: payload };
    case ADD_POST + "_FULFILLED":
      return { ...state, post: payload };
    case EDIT_POST + "_FULFILLED":
      return { ...state, post: payload };
    case DELETE_POST + "_FULFILLED":
      return { post: payload };
      case GET_POST_BY_ID + '_FULFILLED':
        return{ ...state, post: payload }
    default:
      return state;
  }
}
