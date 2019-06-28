const jwt = require('jsonwebtoken');

module.exports = {
    sign: function(_id, name) {
        // process.env.JWT_SECRET
        return jwt.sign({ _id, name } , 'sulapjs')
    },

    decode: function(accesstoken) {
        return jwt.verify(accesstoken, 'sulapjs')
    }
}