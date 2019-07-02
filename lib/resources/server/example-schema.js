const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
    //sulap-add-models
    //please do not delete comment above
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