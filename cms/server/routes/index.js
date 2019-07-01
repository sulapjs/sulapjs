const router = require('express').Router()
const exampleRouter = require('./example')
const userRouter = require('./user')
const AuthController = require('../controllers/auth')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.use('/user', userRouter)
router.use('/EXAMPLEs', exampleRouter);

const err = {
    status: 404,
    message: 'not found 404'
}
router.get('/*', (req, res, next) => {
    next(err);
})
router.post('/*', (req, res, next) => {
    next(err);
})
router.put('/*', (req, res, next) => {
    next(err);
})
router.patch('/*', (req, res, next) => {
    next(err);
})
router.delete('/*', (req, res, next) => {
    next(err);
})

module.exports = router