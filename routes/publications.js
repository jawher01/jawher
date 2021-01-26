const express = require("express");
const router = express.Router();
const publication = require("../models/publication");
const controllers=require("../controllers/publication");



// test routing
//router.get("/", (req, res) => {
//   res.send("hello world");
//});

//post publication
// get all publication
//delete publication
//get one publication by id
//update publication



//@POST method
//@desc post a publication
//@path : http://localhost:5000/user/publication
//Params body
router.post("/", controllers.Postpublication);


//@methode GET
//@desc GET all publication
//@path : http://localhost:5000/user/publication
router.get("/",controllers.GetAllPublication );

//@methode GET
//@desc GET one publication
//@path : http://localhost:5000/user/publication
//Parms id
router.get("/:id", controllers.GetOnePublication);



//@method DELETE
//@desc delete one publication by id
//@path : http://localhost:5000/user/publication
//@Params id
router.delete("/:id", controllers.DeleteOnePublication);

//@method PUT
//@desc update a publication by id
//@path : http://localhost:5000/user/publication
//@Params id body
router.put("/:id", controllers.UpdatePublication);


module.exports = router;


