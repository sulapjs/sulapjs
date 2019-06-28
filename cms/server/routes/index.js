const router = require('express').Router()
const exampleRouter = require('./example')

router.use('/examples', exampleRouter)

router.get('/*', (req,res) => {
    res.status(404).json({
        message: 'not found 404'
    })
})

module.exports = router