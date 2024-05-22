const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECERET = "harryisagoodb$oy";

// ROUTE 1 :  create a user using : POST "api/auth/" . Doestn't require auth
// body -> email , password
// res -> authentication token

router.post(
  "/createuser",
  [
    // these are validation rules
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = await validationResult(req); // validating errors by using validation rules
      console.log(errors);
      console.log("data", req.body);
      if (!errors.isEmpty()) {
        // checking if there are any validation errors
        return res.status(200).json({success:false,errors: errors.array() });
      }
      // check if user with this email already exists or not
      let usr = await User.findOne({ email: req.body.email });
      if (usr) {
        return res.json({success:false,error:"the user with this email is already exists"});
      }
      // creating user
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);

      let user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      await user.save();

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECERET); // creating a aunthetication token for storing in local storage in user device

      res.json({success:true,authToken}); // sending authentication token as a response
    } catch (e) {
      // catching if there are any errors occurred
      res.json({success:false,error:e.message}); // send error as response if ther are occurred
    }
    // res.send(req.body)
  }
);

// ROUTE 2 : authenticate user using POST:/api/auth/login - no login required
// req-> login by email and password 
// res-> authentication token

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    // if there are errors return a bad request and the errors
    const errors = await validationResult(req);
    console.log(errors);
    // console.log("data: ",req.body)
    if (!errors.isEmpty()) {
      console.log("validation faliled");
      return res.status(400).send({success:false,error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.json({ success:false, error: "the email you entered is not exist" });
      }

      console.log(user);

      let passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.json({success:false, error: "please login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECERET);
      res.json({success:true, authToken });
    } catch {
      res.status(400).json({success:false, error: e.message });
    }
  }
);

// ROUTE 3 : get the details of logged in user using POST : /api/auth/getuser -  login required
// header -> authentication token
// res -> user details except password

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (e) {
    res.send(e.message)
  }
});

module.exports = router;
