const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
const clearUser = require('../helpers/clearUser');
const User = require('../models/user');
const jwt = require('../helpers/jwt');
const jwtGen = require('jsonwebtoken');

after(function(done) {
  clearUser(done);
})

describe('AUTHENTICATION', function() {
  describe('POST /register', function() {
    describe('SUCCESS', function() {
      it('should response an object (message and newUser) with status 201', function(done) {
        const register = {
          name: 'New User',
          email: 'user@mail.com',
          password: '123456',
        }
        chai
          .request(app)
          .post('/register')
          .send(register)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('newUser');
            expect(res.body.newUser).to.have.property('_id');
            expect(res.body.newUser).to.have.property('name');
            expect(res.body.newUser).to.have.property('email');
            expect(res.body.newUser).to.have.property('password');
            expect(res.body.newUser.password).to.not.equal(register.password);
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      it('should response an object (message: User validation failed: name, email, password required) with status 400', function(done) {
        const register = {};
        chai
          .request(app)
          .post('/register')
          .send(register)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: User validation failed: email: not unique) with status 400', function(done) {
        const register = {
          name: 'New User',
          email: 'user@mail.com',
          password: '123456'
        }
        chai
          .request(app)
          .post('/register')
          .send(register)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: User validation failed: email: not valid) with status 400', function(done) {
        const register = {
          name: 'Second User',
          email: 'secondUser',
          password: '123456'
        }
        chai
          .request(app)
          .post('/register')
          .send(register)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
  })

  describe('POST /login', function() {
    describe('SUCCESS', function() {
      it('should response an object (message and token) with status 200', function(done) {
        const login = {
          email: 'user@mail.com',
          password: '123456',
        }
        chai
          .request(app)
          .post('/login')
          .send(login)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('token');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      afterEach(function(done) {
        clearUser(done);
      })
      it('should response an object (message) with status 400', function(done) {
        const login = {
          email: 'user@mail.com',
          password: 'secret',
        }
        chai
          .request(app)
          .post('/login')
          .send(login)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
  })

  describe('GET /decode', function() {
    let token = null;
    let tokenNotAllowed = jwtGen.sign({
      name: 'New User',
      email: 'user@mail.com',
    }, 'fake')
    let tokenNotRecognized = jwt.sign({
      name: 'New User 1',
      email: 'user1@mail.com',
    })

    before(function(done) {
      User
        .findOne({
          email: 'user@mail.com'
        })
        .then(function (foundUser) {
          const { _id, name, email } = foundUser;
          token = jwt.sign({ _id, name, email });
          done();
        })
        .catch(function (err) {
          throw err;
        });
    })
    describe('SUCCESS', function() {
      it('should response an object (message and decoded) with status 200', function(done) {
        chai
          .request(app)
          .get('/decode')
          .set({ token })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('decoded');
            expect(res.body.decoded).to.have.property('_id');
            expect(res.body.decoded).to.have.property('name');
            expect(res.body.decoded).to.have.property('email');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      it('should response an object (message: no token assigned) with status 400', function(done) {
        chai
          .request(app)
          .get('/decode')
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: not allowed to access) with status 400. Note: wrong secret jwt', function(done) {
        chai
          .request(app)
          .get('/decode')
          .set({ token: tokenNotAllowed })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message: not recognized input data) with status 400. Note: not registered in database', function(done) {
        chai
          .request(app)
          .get('/decode')
          .set({ token: tokenNotRecognized })
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
  })
})
