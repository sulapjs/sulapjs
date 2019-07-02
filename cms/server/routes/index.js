const router = require('express').Router()
const userRouter = require('./user')
const AuthController = require('../controllers/auth')
const UploadController = require('../controllers/upload')
const multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now()+ '.jpeg')
    }
})
const upload = multer({ storage })
//sulap-route-source
//add 
//`const ${modelname}Router = require('./${modelname})`

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/upload', upload.single('file'), UploadController.uploadImage)
router.use('/user', userRouter)
//sulap-add-route
/* please do not delete comment above  */

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