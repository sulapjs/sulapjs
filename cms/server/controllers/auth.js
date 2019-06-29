const User = require('../models/user');
const { sign } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt');

class AuthController {
  static register(req, res, next) {
    User
      .create(req.body)
      .then(newUser => {
        res
          .status(201)
          .json({
            message: 'User created',
            newUser
          });
      })
      .catch(err => {
        if (err.message === 'Email has been taken') {
          res
            .status(409)
            .json({
              message: err.message
            });
        } else if (RegExp('validation').test(err.message)) {
          if (err.errors.email) {
            res
              .status(400)
              .json({
                message: err.errors.email.message
              });
          } else {
            res
              .status(403)
              .json({
                message: err.message
              });
          }
        } else {
          res
            .status(500)
            .json({
              message: err.message
            });
        }
      });
  }

  static login(req, res, next) {
    User
      .findOne({
        email: req.body.email
      })
      .then(foundUser => {
        if (!foundUser) {
          res
            .status(400)
            .json({
              message: 'User not found'
            });
        } else {
          if (decrypt(req.body.password, foundUser.password)) {
            const token = sign({_id: foundUser._id, name: foundUser.name}, foundUser.role);

            res
              .status(200)
              .json({
                message: 'Login success',
                token: token
              });
          } else {
            res
              .status(400)
              .json({
                message: 'Wrong password'
              });
          }
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: err.message
          });
      });
  }
}

module.exports = AuthController;