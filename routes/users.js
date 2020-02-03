const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../routes/auth')
const jwt = require('jsonwebtoken');
const config = require('../config')

module.exports = server => {
    // Create a new User
    server.post('/auth/register', (req, res, next) => {
        const { email, password } = req.body;

        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                // Encrypt the password
                user.password = hash;

                //Save User to database
                try {
                    const newUser = await user.save();
                    res.send(201)
                    next()
                    
                } catch (err) {
                    return next(new errors.InternalError(err.message))
                }
            });
        })

    });

    //Authenticate a User
    server.post('/api/auth', async (req, res, next)=> {
        const { email, password } = req.body;
        try {
            const user = await auth.authenticate(email, password);
           // Create JWT
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '10m' })
            
            const { iat, exp } = jwt.decode(token);

            // respond with token
            res.send({iat, exp, token})
            console.log(iat, exp, token)
            next();
        } catch(error) {
            //Unauthorized
            return next(new errors.UnauthorizedError(error))
        }
    })
}