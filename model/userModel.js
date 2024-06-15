const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const saltRounds = 10;

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    userpassword: { type: String, required: true },
    useremail: { type: String, required: true },
    token: { type: String, required: true },
}, { timestamps: true })

// UserSchema.pre('save', function (next) {
//     this.userpassword = bcrypt.hashSync(this.userpassword, saltRounds)
//     next();
// })

const UserMasterModel = mongoose.model('usermaster', UserSchema);

module.exports = UserMasterModel