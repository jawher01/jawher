import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { editPublication, postPublication } from "../../js/actions/publication";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'



const Add = () => {
  const _user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const idPub = location.pathname.slice(location.pathname.lastIndexOf("/") + 1)

  const userReducer = useSelector((state) => state.publicationReducer.user);
  const edit = useSelector((state) => state.editReducer.edit);
  
  const publications = useSelector((state) => state.publicationReducer.publication);
  const currentPub = publications.find( p => p._id == idPub)

  console.log({ publications, idPub, currentPub, _user })
  const [user, setUser] = useState({
    name: _user ? _user.name : "",
    email: _user ? _user.email : "",
    date: new Date().toISOString(),
    
    content: currentPub ? currentPub.content : "",
    titre:currentPub ? currentPub.titre : "",
  });
  
  const dispatch = useDispatch();

  const handlePublication = () => {
    // !edit =>  if add publication 
    if (!edit) {
      dispatch(postPublication(user));
    } else {
      // edit pub 
      dispatch(editPublication(idPub,user ));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <Form>
      <Form.Field>
        <label> Name</label>
        <input
          value={user.name}
          placeholder=" Name"
          name="name"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          value={user.email}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>content</label>
        <input
          value={user.content}
          placeholder="content"
          name="content"
          onChange={handleChange}
        />
      </Form.Field>
     
      <Form.Field>
        <label>date</label>
        <input
          value={user.date}
          placeholder="date"
          name="date"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>titre</label>
        <input
          value={user.titre}
          placeholder="titre"
          name="titre"
          onChange={handleChange}
        />
      </Form.Field>

    

     <Link to="/publication">
        <Button type="submit" onClick={handlePublication}>
        {edit ? "Edit" : "Save"}
      </Button>
      </Link>
    </Form>
  );
};

export default Add;
