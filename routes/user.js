const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const controllers = require("../controllers/user");
const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");

const isAuth = require("../middleware/passport");

// router.get("/", (req, res) => {
//   res.send("hello world");
// });

//@method POST
//@desc POST A USER
// @PATH  http://localhost:9000/user/register
// @Params  Body
// register
router.post("/register", registerRules(), validation, controllers.register);

//@method POST
//@desc POST A USER
// @PATH  http://localhost:9000/user/login
// @Params  Body
// register
// login
router.post("/login", loginRules(), validation, controllers.login);

//@method GET
//@desc GET A USER
// @PATH  http://localhost:9000/user/current
// @Params  Body
// get current user
router.get("/current", isAuth(), controllers.current);


//@method get
//@desc GET All USER
// @PATH  http://localhost:9000/user/admin
// @Params  Body

router.get("/admin", controllers.admin);


//@method DELETE
//@desc delete one user by id
//@path : http://localhost:9000/user/admin
//@Params id
router.delete("/admin/:id", controllers.DeleteOneUser);






module.exports = router;

