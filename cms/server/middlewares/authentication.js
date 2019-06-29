const jwt = require('../helpers/jwt');
const User = require('../models/user');

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('token')) {
    try {
      const { token } = req.headers;
      const decoded = jwt.decode(token);
      // console.log(decoded, '---decoded')
      User.findOne({
        email: decoded.email
      })
        .then(foundUser => {
          if (!foundUser) {
            const err = {
              status: 400,
              message: 'not recognized input data'
            }
            // next(err);
            res.status(400).json({
              message: err.message
            })
          } else {
            req.decoded = decoded;
            next();
          }
        })
    } catch (error) {
      const err = {
        error,
        status: 400,
        message: 'not allowed to access'
      }
      // next(err);
      res.status(400).json({
        message: err.message
      })
    }
  } else {
    const err = {
      status: 400,
      message: 'no token assigned'
    }
    // next(err);
    res.status(400).json({
      message: err.message
    })
  }
}