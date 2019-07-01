const mongoose   = require('mongoose');
const { Schema } = mongoose;
const { encrypt } = require('../helpers/bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [
            {
                validator: v => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v),
                message: 'Email is not valid email address'
            },
            {
                validator: function (v) {
                    return mongoose
                        .model('User', UserSchema)
                        .findOne({
                            _id: {
                                $ne: this._id
                            },
                            email: v
                        })
                        .then(found => {
                            if (found) {
                                return false;
                            } else {
                                return true;
                            }
                        })
                        .catch(err => {
                            throw err
                        })
                },
                message: 'Email has been taken'
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

UserSchema.pre('save', function (next) {
    this.password = encrypt(this.password);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;