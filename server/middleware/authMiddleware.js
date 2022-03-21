const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization");
    if (!token) {
      res.status(401);
      throw new Error("Authorization denied, no token");
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
};

module.exports = { auth };
