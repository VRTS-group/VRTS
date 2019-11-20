import axios from "axios";

const initialState = {
  user: {
    id: 0,
    email: "",
    username: "",
    profile: "",
    cover: "",
    real_name: "",
    contact: "",
    bio: ""
  }
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  }
}
