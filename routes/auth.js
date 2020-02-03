const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //try to fetch user
            const user = await User.findOne({ email })
            
            // Match User email with password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    // Password did not match
                    reject('Failed to authenicate user')
                }
            })
        } catch (err) {
            // Can't find user email
            reject('Sorry, Authentication failed')
        }
    });
}