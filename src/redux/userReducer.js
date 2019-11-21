import axios from "axios";

const initialState = {
  user: {
    id: 0,
    email: "",
    username: "",
    profile_pic: "",
    cover_pic: "",
    real_name: "",
    contact: "",
    bio: "",
    signedIn: false
  }
};
//actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";
const EDIT_USER = "EDIT_USER";

//functions
export function login(email, password) {
  let data = axios
    .post("/auth/login", {
      email,
      password
    })
    .then(res => {
      return res.data;
    });
  return {
    type: LOGIN,
    payload: data
  };
}

export function getUser(id) {
  let data = axios.get(`/auth/user/${id}`).then(res => {
    return res.data;
  });
  return {
    type: GET_USER,
    payload: data
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: null
  };
}

export function editUser(
  id,
  username,
  profile_pic,
  cover_pic,
  real_name,
  contact,
  bio
) {
  let data = axios.put(`/auth/editUser/${id}`, {
    username,
    profile_pic,
    cover_pic,
    real_name,
    contact,
    bio
  });
  return {
    type: EDIT_USER,
    payload: data
  };
}
// default function
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN + "_FULFILLED":
      return { ...state, user: payload };
    case LOGOUT:
      return { ...state, user: { signedIn: false } };
    case GET_USER + "_FULFILLED":
      return { ...state, user: payload };
    case EDIT_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
}
