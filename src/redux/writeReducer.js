import axios from "axios";

const initialState = {
  write: {
    write_id: 0,
    user_id: 0,
    media: "",
    title: "",
    description: "",
    tags: "",
    views: "",
    saves: false,
    cover_photo: ""
  }
};

const GET_WRITE = "GET_WRITE";
const ADD_WRITE = "ADD_WRITE";
const EDIT_WRITE = "EDIT_WRITE";
const DELETE_WRITE = "DELETE_WRITE";
const GET_WRITE_BY_ID = 'GET_WRITE_BY_ID';
const GET_WRITE_BY_USER = 'GET_WRITE_BY_USER';


export function getWrite() {
  let get = axios.get(`/auth/getWrite`).then(res => {
    return res.data;
  });
  return {
    type: GET_WRITE,
    payload: get
  };
}

export function getWriteById(id) {
  let get = axios.get(`/auth/getWriteById/${id}`).then(res => {
    return res.data;
  });
  return {
    type: GET_WRITE_BY_ID,
    payload: get
  };
}

export function getWriteByUser(id) {
  let get = axios.get(`/auth/getWriteByUser/${id}`)
  .then(res => {
    return res.data
  });
  return{
    type: GET_WRITE_BY_USER,
    payload: get
  };
}

export function addWrite(
  user_id,
  media,
  title,
  description,
  tags,
  views,
  saves,
  cover_photo
) {
  let add = axios
    .post("/auth/addWrite", {
      user_id,
      media,
      title,
      description,
      tags,
      views,
      saves,
      cover_photo
    })
    .then(res => {
      return res.data;
    });
  return {
    type: ADD_WRITE,
    payload: add
  };
}

export function editWrite(id, title, description, tags, cover_photo, media) {
  let edit = axios
    .put(`/auth/editWrite/${id}`, { title, description, tags, cover_photo, media })
    .then(res => {
      return res.data;
    });
  return {
    type: EDIT_WRITE,
    payload: edit
  };
}

export function deleteWrite(id) {
  let gone = axios.delete(`/auth/deleteWrite/${id}`).then(res => res.data);
  return {
    type: DELETE_WRITE,
    payload: gone
  };
}

export default function writeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_WRITE + "_FULFILLED":
      return { write: payload };
    case ADD_WRITE + "_FULFILLED":
      return { ...state, write: payload };
    case EDIT_WRITE + "_FULFILLED":
      return { ...state, write: payload };
    case DELETE_WRITE + "_FULFILLED":
      return { write: payload };
      case GET_WRITE_BY_ID + '_FULFILLED':
        return{ ...state, write: payload }
        case GET_WRITE_BY_USER + '_FULFILLED':
        return{ ...state, write: payload }
    default:
      return state;
  }
}
