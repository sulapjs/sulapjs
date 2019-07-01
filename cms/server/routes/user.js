const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');
const Authenticate = require('../middlewares/authentication');

router.use(Authenticate);

router.get('/decode', AuthController.decode);


module.exports = router;