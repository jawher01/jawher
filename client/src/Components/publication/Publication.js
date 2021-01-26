import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import {
  deletePublication,
  getPublication,
  addComment
} from "../../js/actions/publication";
import { toggleTrue } from "../../js/actions/edit";



const Publication = ({ publication }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("")
  const dispatch = useDispatch();


  const user = useSelector((state) => state.userReducer.user);
    
  const isOwner = publication && user && publication.email == user.email;
  console.log({ user, publication })

  const renderName = c => {
    console.log(c);
    if (c.email == user.email) return "You";
    return c.userName
  }
 
  const renderComment = (c, index) =>
    <div key={`comment-${index}`} style={{ display: "flex", justifyContent: "space-between", paddingInline: 22,}}>
      <div>{c.content}</div>
      <div>{renderName(c)}</div>
    </div>
  return (
    <Card > 
      <Card.Content>
        {false && <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />}
        <Card.Meta>{publication.name}</Card.Meta>
        <Card.Meta>{publication.email}</Card.Meta>
        <Card.Description>
          <strong>{publication.titre}</strong>
        </Card.Description>

        <Card.Meta>{publication.content}</Card.Meta>
      </Card.Content>
      <Card.Content extra style={{ display: "flex", justifyContent: "space-around" }}>
        {isOwner && (
          <div className="ui two buttons">
            <Link to={`publication/edit/${publication._id}`}>
              <Button
                inverted
                color="green"
                onClick={() => {
                  dispatch(getPublication(publication._id));
                  dispatch(toggleTrue());
                }}
              >
                Edit
              </Button>
            </Link>
            <Button
              inverted
              color="red"
              onClick={() => dispatch(deletePublication(publication._id))}
            >
              Delete
            </Button>

          </div>
        )}

      </Card.Content>

      {
        
        publication.comments
        .filter((c, i) => c.length > 0 ? c.key : i < 3) 
          .map(c => ({ content: c.content, email: c.email, name: c.name }))
          .map(renderComment)
      }
      
      {
        comments
       
        .map(c => ({ content: c, userName: "You", email: user.email }))
          .map(renderComment)
          
      }



      <div style={{ display: "flex"}}>
        <input
          placeholder="Comment"
          name="comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <Button
          inverted
          color="blue"
          onClick={() => {
            setComments([...comments, comment]);
            addComment(publication._id, { email: user.email, content: comment });
            setComment("");
          }}
        >
          add comment
          </Button>


      </div>
    </Card>
  );
};

export default Publication;
