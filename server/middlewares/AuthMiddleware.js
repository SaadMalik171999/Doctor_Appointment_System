const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(" ")[1];
    JWT.verify(token, process.env.JWT_KEY, (err, decode) => {
      
      if(decode)  {
        req.body.userId = decode.id;
        next();
      }
      else{
            return res.status(400).send({ message: "Auth Failed", success: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
