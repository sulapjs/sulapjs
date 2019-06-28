const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
const clearUser = require('../helpers/clearUser');

after(function(done) {
  clearUser(done);
})

describe('AUTHENTICATION', function() {
  describe('POST /register', function() {
    describe('SUCCESS', function() {
      it('should response an object (message and newUser with role: admin)with status 201', function(done) {
        const register = {
          name: 'Admin',
          email: 'admin@mail.com',
          password: '123456',
          role: 'admin'
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
            expect(res.body.newUser).to.have.property('role');
            expect(res.body.newUser.password).to.not.equal(register.password);
            expect(res.body.newUser.role).to.equal('admin');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message and newUser with role: normalUser)with status 201', function(done) {
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
            expect(res.body.newUser).to.have.property('role');
            expect(res.body.newUser.password).to.not.equal(register.password);
            expect(res.body.newUser.role).to.equal('normalUser');
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
            expect(res.body).to.have.property('user');
            expect(res.body).to.have.property('role');
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
})
