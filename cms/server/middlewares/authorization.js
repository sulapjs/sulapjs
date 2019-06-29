const Example = require('../models/EXAMPLE');

module.exports = (req, res, next) => {
  const { decoded } = req;
  const { id } = req.params;

  Example.findById(id)
    .populate({
      path: 'refId',
      // select: ['_id', 'name', 'email']
    })
    .then(EXAMPLE => {
      if (!EXAMPLE) {
        const err = {
          status: 404,
          message: 'data not found'
        }
        next(err);
      } else {
        //   console.log(JSON.stringify(EXAMPLE, null ,2))
  console.log('MASUKKKKKKKKK')
  console.log('EXAMPLEEEEEEE', EXAMPLE)
  if (EXAMPLE.refId._id != decoded._id) {
          const err = {
            status: 401,
            message: 'unauthorized to access'
          }
          next(err);
        } else {
          req.EXAMPLE = EXAMPLE;
          next();
        }
      }
    })
    .catch(err => {
      next(err);
    })
}