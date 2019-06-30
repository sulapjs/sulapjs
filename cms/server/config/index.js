//this file is for dynamic file naming

module.exports ={
    mongoUrl: process.env.MONGO_URL || (
        /*databaseName*/ 
        /** please do not delete comment above */ 
        'mongodb://localhost:27017/sulap-example_'+ process.env.NODE_ENV
        )
}