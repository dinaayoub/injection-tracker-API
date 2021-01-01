'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

usersSchema.pre('save', async function() {
    //checks to see if the password has changed
    //this refers to the new user object we're running this on
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

usersSchema.statics.authenticateBasic = async function (username, password) {
    const user = await this.findOne({username});
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { 
        return user;
    }
    throw new Error('Invalid User');
}

module.exports = mongoose.model('users',usersSchema);