const Example = require('../models/EXAMPLE')
class ExampleController {
    static create(req,res, next) {
        let createObj = {}
        
        const keys = Object.keys(req.body)
        //loop the keys, add existing keys from req.body
        keys.forEach(el => {
            createObj[el] = req.body[el]
        })

        // console.log(req.decoded._id, '---- decoded')
        createObj.refId = req.decoded._id
        createObj.created = new Date()
        createObj.updated = new Date()

        Example.create(createObj)
        .then(created => {
            res.status(201).json({
                newEXAMPLE: created,
                message: 'success createNewExample'
            })
        })
        .catch(err => {
            next(err)
            // if(err.errors.name) {
            //     res.status(400).json({
            //         message: err.message,
            //     })
            // } else {
            //     res.status(500).json({
            //         message: err.message,
            //         error: 'error createNewExample'
            //     })
            // }
        })
    }

    static findOne(req,res, next) {
        const { id } = req.params

        Example.findOne({_id: id})
        .then(exampleFindOne => {
            if(!exampleFindOne) {
                const err = {
                    message: 'fineOneExample not found',
                    status: 404,
                }
                next(err)
            } else {
                res.status(200).json({
                    EXAMPLE: exampleFindOne,
                    message: 'success findOneExample'
                })
            }
        })
        .catch(err => {
            next(err)
            // res.status(500).json({
            //     message: err.message,
            //     error: 'error findOneExample'
            // })
        })
    }

    static findAll(req,res, next) {
        //add query above, alter below as needed
        let query;
        if(req.query.search) {
            
            let query = {$or:[
                //sulap-add-query

            ]}
        }

        Example.find(query)
        .then(exampleFindAll => {
            if(exampleFindAll.length === 0) {
                res.status(404).json({
                    message: 'No data yet in findAllExample'
                })
            } else {
                res.status(200).json({
                    EXAMPLEs:exampleFindAll,
                    message: 'success findAllExample'
                })
            }
        })
        .catch(err => {
            next(err)
            // res.status(500).json({
            //     message: err.message,
            //     error: 'error findAll example'
            // })
        })
    }

    static updateOnePatch(req,res, next) {
        const { id } = req.params
        let updateObj = {}
        const keys = Object.keys(req.body)
        //loop the keys, add existing keys from req.body
        keys.forEach(el => {
            updateObj[el] = req.body[el]
        })
        updateObj.updated = new Date()
 
        Example.findOneAndUpdate({_id: id}, updateObj, { new:true })
        .then(exampleUpdated => {
            // console.log(exampleUpdated, '---- example updated patch')

            res.status(201).json({
                message: 'success updateOnePatchExample',
                updatedEXAMPLE: exampleUpdated,
            })
        })
        .catch(err => {
            next(err)
            // res.status(500).json({
            //     message: err.message,
            //     error: 'error findOneAndUpdateOne example'
            // })
        })
    }

    static updateOnePut(req,res, next) {
        const { id } = req.params
        let updateObj = {}
        const keys = Object.keys(req.body)
        //loop the keys, add existing keys from req.body
        keys.forEach(el => {
            updateObj[el] = req.body[el]
        })
        updateObj.updated = new Date()

        Example.findOneAndUpdate({_id: id}, updateObj, { new:true })
        .then(exampleUpdated => {
            res.status(201).json({
                updatedEXAMPLE:exampleUpdated,
                message: 'findOneAndUpdateExample success'
            })
        })
        .catch(err => {
            next(err)
            // res.status(500).json({
            //     message: err.message,
            //     error: 'error findOneAndUpdateOne example'
            // })
        })
    }

    static deleteOne(req,res, next) {
        const { id } = req.params
        
        Example.findOneAndDelete({ _id: id })
        .then(exampleDeleted => {
            res.status(200).json({
                deletedEXAMPLE: exampleDeleted,
                message: 'findOneAndDeleteExample success'
            })
        })
        .catch(err => {
            next(err)
            // res.status(500).json({
            //     message: err.message,
            //     error: 'error findOneAndDelete example'
            // })
        })
    }

}
module.exports = ExampleController