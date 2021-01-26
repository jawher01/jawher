import React from "react";
import {  Button, Card} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import {
  deleteUser
 
} from "../../js/actions/user";

const User = ({ user }) => {
  const dispatch = useDispatch();
    return (
      <div>
    <Card > 
      <Card.Content>
        <Card.Meta>{user.name}</Card.Meta>
        <Card.Meta>{user.email}</Card.Meta>
      </Card.Content>
      <Button
              inverted
              color="red"
              onClick={() => dispatch(deleteUser(user._id))}
            >
              Delete
            </Button>
             </Card>
    </div>
  );
};

export default User;