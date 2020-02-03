const restify = require('restify'); //loads restify
const mongoose = require('mongoose'); //loads mongoose
const config = require('./config'); //loads our configuration file
const rjwt = require('restify-jwt-community');  //loads 
const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser())

//Protected Routes
server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/api/auth', '/auth/register', '/api/debtors/','/api/debtors:id'] }));
server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false)
    mongoose.connect(
        config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,   
    }
    );
});

const database = mongoose.connection;
database.on('error', (err) => {
    console.log(err)
})

database.once('open', () => {
    require('./routes/debtors')(server)
    require('./routes/users')(server)
    console.log(`Server running on Port: ${config.PORT}`);
})
