const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
    exampleKey1: {
        type: String,
    },
    exampleKey2: {
        type: String,
    },
    
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
    },
    //
    created: {
        type: Date,
    },
    updated: {
        type: Date,
    },


    refId: {
        required: [true, 'user must be logged in'],
        type: Schema.Types.ObjectId, ref: 'User'
    },
});
const Example = mongoose.model('Example', exampleSchema)
module.exports = Example