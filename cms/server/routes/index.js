const router = require('express').Router()
const exampleRouter = require('./example')
const AuthController = require('../controllers/auth')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.use('/EXAMPLEs', exampleRouter);

router.get('/*', (req,res) => {
    res.status(404).json({
        message: 'not found 404'
    })
})

module.exports = router