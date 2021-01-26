import axios from "axios"
import {
  GET_PUBLICATIONS_FAILED,
  GET_PUBLICATIONS_SUCCESS,
  GET_PUBLICATIONS_LOAD,
  GET_PUBLICATION,
  EDIT_PUBLICATION
}
  from "../const/publication"



export const getAllPublications = () => async (dispatch) => {
  dispatch({ type: GET_PUBLICATIONS_LOAD })
  try {
    let result = await axios.get("http://localhost:9000/user/publication")
    dispatch({ type: GET_PUBLICATIONS_SUCCESS, payload: result.data.response })

  } catch (error) {
    dispatch({ type: GET_PUBLICATIONS_FAILED, payload: error })
  }
}
export const deletePublication = (id) => async (dispatch) => {

  axios
    .delete(`http://localhost:9000/user/publication/${id}`)
    .then(res => dispatch(getAllPublications()))
    .then(()=>alert("Publication supprimer avec succes"))
    .catch((err) => console.log(err));
};
export const getPublication = (id) => (dispatch) => {
  axios
    .get(`http://localhost:9000/user/publication/${id}`)
    .then((res) => dispatch({ type: GET_PUBLICATION, payload: res.data.response }))
    .catch((err) => console.log(err));
};

export const postPublication = (user) => async (dispatch) => {
  console.log({ user })
  axios
    .post("http://localhost:9000/user/publication", user)
    .then((res) => dispatch(getPublication()))
    .then(()=>alert("Publication ajouter avec succes"))
    .catch((err) => console.log(err));
  // try {
  // let result = await axios.post("/publication/name", user)
  //dispatch(getPublication());
  //} catch (error) {
  //console.log(error.response);
  //}
};

export const editPublication = (idPub, publication) => (dispatch) => {
  axios
    .put(`http://localhost:9000/user/publication/${idPub}`, publication)
    .then((res) => {
      alert("Publication modifier avec succes");

      dispatch({ type: EDIT_PUBLICATION, payload: { _id: idPub, ...res.data.user } });
    })
    .then(dispatch(getPublication(idPub)))
    .catch((err) => console.log(err));
};


export const addComment = (idPub, comment,) => {
  console.log( idPub, )
  axios
    .post(`http://localhost:9000/user/comment/${idPub}`, comment)
    .then((res) => {
      console.log(res);
      alert("comment ajouter avec succes");
    })
    .catch((err) => console.log(err));
}