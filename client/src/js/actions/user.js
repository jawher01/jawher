import axios from "axios"
import {
  LOAD_USER,
  REGISTER_USER,
  LOGIN_USER,
  FAIL_USER,
  LOGOUT_USER,
  CURRENT_USER,
  GET_USERS_LOAD,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED
  
} from "../const/user";



export const registerUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("http://localhost:9000/user/register", user);
    //{user,msg,token}
    // localStorage.setItem("token",result.data.token)
    dispatch({ type: REGISTER_USER, payload: result.data });
    history.push("/dashbord");
  } catch (error) {
    const { errors} = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err));
    }
    // dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const loginUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("http://localhost:9000/user/login", user);
    //{user,msg,token}
    dispatch({ type: LOGIN_USER, payload: result.data });
    history.push("/dashbord");
  } catch (error) {
    const { errors, msg } = error.response.data;
    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    if (msg) {
      alert(msg);
    }
  }
};

export const current = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get("http://localhost:9000/user/current", options);
    //  user
    dispatch({ type: CURRENT_USER, payload: result.data.user });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};


//admin
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS_LOAD })
  try {
    let result = await axios.get("http://localhost:9000/user/admin")
    dispatch({ type: GET_USERS_SUCCESS, payload: result.data.response })
  } catch (error) {
    dispatch({ type: GET_USERS_FAILED, payload: error })
  }
}

export const deleteUser = (id) => async (dispatch) => {

  axios
    .delete(`http://localhost:9000/user/admin/${id}`)
    .then(res => dispatch(getAllUsers()))
    .then(()=>alert("User supprimer avec succes"))
    .catch((err) => console.log(err));

};