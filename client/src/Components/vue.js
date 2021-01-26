import React from 'react'
import { Carousel,Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player"
function vue() {
    return (
        <div>
      
      <Link to="/Signup"> <Button variant="primary">    connecter</Button></Link>
           <Carousel style={{marginTop:"10%" ,marginLeft:"20%",marginRight:"20%"}}>
  <Carousel.Item >
    <img
      className="d-block w-100"
      src="image.jfif"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item >
    <img
      className="d-block w-100"
      src="images.jfif"
      alt="Third slide"
      
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
 

</Carousel>
<div style={{marginTop:"10%" ,marginLeft:"20%",marginRight:"20%"}}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=Fs7yZb1_xAQ"
      />
    </div>

        </div>
    )
}

export default vue
