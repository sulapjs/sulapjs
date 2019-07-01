const User = require('../models/user');
const { sign } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt');

class AuthController {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    User
      .create({ name, email, password })
      .then(newUser => {
        res
          .status(201)
          .json({
            message: 'User created',
            newUser
          });
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User
      .findOne({
        email
      })
      .then(foundUser => {
        if (!foundUser) {
          const err = {
            status: 400,
            message: 'Email / password incorrect'
          }
          next(err);
        } else {
          if (decrypt(password, foundUser.password)) {
            const token = sign({
              _id: foundUser._id, 
              name: foundUser.name,
              email: foundUser.email
            });

            res
              .status(200)
              .json({
                message: 'Login success',
                token
              });
          } else {
            const err = {
              status: 400,
              message: 'Email / password incorrect'
            }
            next(err);
          }
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = AuthController;