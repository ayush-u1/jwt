const jwt = require("jsonwebtoken");
User = require("../models/user");
const API_SECRET="This_is_very_secret_string"

const verifyToken = (req, res, next) => {
  console.log(req.headers)
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT')
  {
    jwt.verify(req.headers.authorization.split(' ')[1],API_SECRET, function (err, decode) {
      if (err) req.user = undefined;
      User.findOne({
          _id: decode.id
        })
        .then((err, user) => {
          if (err) {
            res.status(500)
              .send({
                message: err
              });
          } else {
            req.user = user;
            next();
          }
        })
    });
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;