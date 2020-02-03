module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    URL: process.env.BASE_URL || 'http://localhost:5000',
    MONGODB_URI: 'mongodb+srv://root:7K9ELelGi9mTt8MT@cluster0-wh4p9.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey'
}