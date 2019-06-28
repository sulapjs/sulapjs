const controller = require('../controllers/example')
const router = require('express').Router()
//const {authenticate, authorize} = require('../middlewares/auth.js')
//router.use(authenticate)
router.get('/', controller.findAll)
router.post('/', controller.create)

//authorization
//router.use('/:id', authorize)
router.get('/:id', controller.findOne)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router