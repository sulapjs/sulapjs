const jwt = require('jsonwebtoken');

module.exports = {
    sign: function(obj) {
        // process.env.JWT_SECRET
        return jwt.sign(obj, 'sulapjs')
    },

    decode: function(accesstoken) {
        return jwt.verify(accesstoken, 'sulapjs')
    }
}