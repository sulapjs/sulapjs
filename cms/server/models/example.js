const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
    exampleKey1: {
        type: String,
    },
    exampleKey2: {
        type: String,
    }
});
const Example = mongoose.model('Example', exampleSchema)
module.exports = Example