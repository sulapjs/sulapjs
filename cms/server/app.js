//require('dotenv').config()
const express = require('express')
const app = express();
const router = require('./routes')
const PORT = 3000;
const cors = require('cors')
const mongoose = require('mongoose');
const { mongoUrl } = require('./config')
const errorHandler = require('./middlewares/errorhandler');

mongoose.connect(mongoUrl, {useNewUrlParser:true})
    .then(connection => {
        console.log('database connected');
    })
    .catch(err => {
        console.log('database not connected');
    })

//body parser
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.use(errorHandler);

module.exports = app

app.listen(PORT, () => {
    console.log('app is listening on port ,', PORT)
})