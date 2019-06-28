const Example = require('../models/example')
class ExampleController {
    static create(req,res) {
        let createObj = {}
        
        const keys = Object.keys(req.body)
        //loop the keys, add existing keys from req.body
        keys.forEach(el => {
            createObj[el] = req.body[el]
        })

        Example.create(createObj)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error create new example'
            })
        })
    }

    static findOne(req,res) {
        const { id } = req.params

        Example.findOne({_id: id})
        .then(exampleFindOne => {
            res.status(200).json(exampleFindOne)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error findOne example'
            })
        })
    }

    static findAll(req,res) {
        //add query above, alter below as needed

        Example.find({})
        .then(exampleFindAll => {
            res.status(200).json(exampleFindAll)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error findAll example'
            })
        })
    }

    static updateOne(req,res) {
        const { id } = req.params
        let updateObj = {}
        const keys = Object.keys(req.body)
        //loop the keys, add existing keys from req.body
        keys.forEach(el => {
            updateObj[el] = req.body[el]
        })

 
        Example.findOneAndUpdate({_id: id}, updateObj, { new:true })
        .then(exampleUpdated => {
            res.status(200).json(exampleUpdated)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error findOneAndUpdateOne example'
            })
        })
    }

    static deleteOne(req,res) {
        const { id } = req.params
        
        Example.findOneAndDelete({ _id: id })
        .then(exampleDeleted => {
            res.status(200).json(exampleDeleted)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error findOneAndDelete example'
            })
        })
    }

}
module.exports = ExampleController