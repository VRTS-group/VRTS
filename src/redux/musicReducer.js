import axios from "axios";

const initialState = {
  music: {
    music_id: 0,
    user_id: 0,
    media: "",
    title: "",
    description: "",
    tags: "",
    views: "",
    saves: false
  }
};

const GET_MUSIC = "GET_MUSIC";
const ADD_MUSIC = "ADD_MUSIC";
const EDIT_MUSIC = "EDIT_MUSIC";
const DELETE_MUSIC = "DELETE_MUSIC";
const GET_MUSIC_BY_ID = 'GET_MUSIC_BY_ID';
const GET_MUSIC_BY_USER = 'GET_MUSIC_BY_USER';


export function getMusic() {
  let get = axios.get(`/auth/getMusic`).then(res => {
    return res.data;
  });
  return {
    type: GET_MUSIC,
    payload: get
  };
}

export function getMusicById(id) {
  let get = axios.get(`/auth/getMusicById/${id}`).then(res => {
    return res.data;
  });
  return {
    type: GET_MUSIC_BY_ID,
    payload: get
  };
}

export function getMusicByUser(id) {
  let get = axios.get(`/auth/getMusicByUser/${id}`)
  .then(res => {
    return res.data
  });
  return{
    type: GET_MUSIC_BY_USER,
    payload: get
  };
}

export function addMusic(
  user_id,
  media,
  title,
  description,
  tags,
  views,
  saves
) {
  let add = axios
    .music("/auth/addMusic", {
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
    type: ADD_MUSIC,
    payload: add
  };
}

export function editMusic(id, title, description, tags) {
  let edit = axios
    .put(`/auth/editMusic/${id}`, { title, description, tags })
    .then(res => {
      return res.data;
    });
  return {
    type: EDIT_MUSIC,
    payload: edit
  };
}

export function deleteMusic(id) {
  let gone = axios.delete(`/auth/deleteMusic/${id}`).then(res => res.data);
  return {
    type: DELETE_MUSIC,
    payload: gone
  };
}

export default function musicReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MUSIC + "_FULFILLED":
      return { music: payload };
    case ADD_MUSIC + "_FULFILLED":
      return { ...state, music: payload };
    case EDIT_MUSIC + "_FULFILLED":
      return { ...state, music: payload };
    case DELETE_MUSIC + "_FULFILLED":
      return { music: payload };
      case GET_MUSIC_BY_ID + '_FULFILLED':
        return{ ...state, music: payload }
        case GET_MUSIC_BY_USER + '_FULFILLED':
        return{ ...state, music: payload }
    default:
      return state;
  }
}
