const jwt = require("jsonwebtoken");
const JWT_SECERET = "harryisagoodb$oy";

const fetchuser = (req, res, next) => {
  // get the user id from the jwt token and add it to req object
  const token = req.header("auth-token");
  console.log(token)
  if (!token) {
    console.log("first validation")
    return res.status(401).send("Please authenticate with valid token");
  }
  try {
    const data = jwt.verify(token, JWT_SECERET);
    // JWT verify method is used for verify the token the take two arguments one is token string value, and second one is secret key for matching the token is valid or not. The validation method returns a decode object that we stored the token in.
    req.user = data.user;
    next();
  } catch (e) {
    res
      .status(401)
      .json({
        error: e.message,
        mesage: "Please authenticate with valid token",
      });
  }
};

module.exports = fetchuser;
