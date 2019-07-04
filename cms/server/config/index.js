//this file is for dynamic file naming

module.exports = {
    mongoUrl: process.env.MONGO_URL || (
        //insert your database url here
        /*databaseName*/ 
        /** please do not delete comment above */ 
        //if test is run --> url below will be used,
        //else /*databaseName*/ will be replaced with user's input
        //database below is for testing
        'mongodb://localhost:27017/sulap-example_'+ process.env.NODE_ENV
        )
}