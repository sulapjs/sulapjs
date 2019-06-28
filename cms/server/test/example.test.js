const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
const Example = require('../models/EXAMPLE');
const User = require('../models/user');
const clearExample = require('../helpers/clearExample');
const clearUser = require('../helpers/clearUser');
const jwt = require('../helpers/jwt');
const jwtGen = require('jsonwebtoken');

after(function(done) {
  clearExample(done);
})

describe('EXAMPLE', function() {
  let token = null;
  let tokenNotAllowed = jwtGen.sign({
    name: 'User',
    email: 'user@mail.com',
  }, 'fake')
  let tokenNotRecognized = jwt.sign({
    name: 'User 1',
    email: 'user1@mail.com',
  })
  let exampleId = null;

  after(function(done) {
    clearUser(done);
  })

  describe('GET /EXAMPLEs and GET /EXAMPLEs/:id', function() {
    describe('SUCCESS', function() {
      before(function(done) {
        Example.create({
          name: 'Trial Example',
          description: 'Trial description',
          created: new Date(),
          updated: new Date()
        })
          .then(function(newEXAMPLE) {
            exampleId = newEXAMPLE._id;
            done();
          })
          .catch(function(err) {
            throw err
          })
      })
      after(function(done) {
        clearExample(done);
      })
      it('should response an object (message, EXAMPLEs) with status 200', function(done) {
        chai
          .request(app)
          .get('/EXAMPLEs')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('EXAMPLEs');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message, EXAMPLE) with status 200', function(done) {
        chai
          .request(app)
          .get(`/EXAMPLEs/${exampleId}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('EXAMPLE');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      it('should response an object (message) with status 404', function(done) {
        chai
          .request(app)
          .get('/EXAMPLEs')
          .then(res => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message) with status 404', function(done) {
        chai
          .request(app)
          .get(`/EXAMPLEs/${exampleId}`)
          .then(res => {
            expect(res).to.have.status(404);
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

  describe('POST /EXAMPLEs', function() {
    before(function(done) {
      const inputUser = {
        name: 'User',
        email: 'user@mail.com',
        password: '123456',
      }
      User.create(inputUser)
        .then(newUser => {
          const { _id, name, email } = newUser;
          token = jwt.sign({
            _id, name, email
          })
          done();
        })
        .catch(err => {
          throw err;
        })
    })

    describe('SUCCESS', function() {
      it('should response an object (message and newEXAMPLE) with status 201', function(done) {
        const inputExample = {
          name: 'New Example',
          description: 'Trial description',
        }
        chai
          .request(app)
          .post('/EXAMPLEs')
          .set({ token })
          .send(inputExample)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('newEXAMPLE');
            expect(res.body.newEXAMPLE).to.have.property('_id');
            expect(res.body.newEXAMPLE).to.have.property('name');
            expect(res.body.newEXAMPLE).to.have.property('description');
            expect(res.body.newEXAMPLE).to.have.property('refId');
            expect(res.body.newEXAMPLE).to.have.property('created');
            expect(res.body.newEXAMPLE).to.have.property('updated');
            expect(res.body.newEXAMPLE.refId).to.be.an('object');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      describe('VALIDATION', function() {
        it('should response an object (message: Example validation failed: name: required) with status 400', function(done) {
          const inputExample = {
            name: '',
            description: 'Trial description',
          }
          chai
            .request(app)
            .post('/EXAMPLEs')
            .set({ token })
            .send(inputExample)
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
      describe('AUTHENTICATION', function() {
        it('should response an object (message: no token assigned) with status 400', function(done) {
          const inputExample = {
            name: 'New Example',
            description: 'Trial description',
          }
          chai
            .request(app)
            .post('/EXAMPLEs')
            .send(inputExample)
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
          const inputExample = {
            name: 'New Example',
            description: 'Trial description',
          }
          chai
            .request(app)
            .post('/EXAMPLEs')
            .set({ token: tokenNotAllowed })
            .send(inputExample)
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
          const inputExample = {
            name: 'New Example',
            description: 'Trial description',
          }
          chai
            .request(app)
            .post('/EXAMPLEs')
            .set({ token: tokenNotRecognized })
            .send(inputExample)
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

  describe('PUT PATCH DELETE /EXAMPLEs/:id', function() {
    describe('SUCCESS', function() {
      before(function(done) {
        Example.create({
          name: 'Trial Example',
          description: 'Trial description',
          created: new Date(),
          updated: new Date()
        })
          .then(function(newEXAMPLE) {
            exampleId = newEXAMPLE._id;
            done();
          })
          .catch(function(err) {
            throw err
          })
      })

      it('should response an object (message and updatedEXAMPLE) with status 201. Note: UPDATE PUT', function(done) {
        const inputExample = {
          name: 'Trial Example edited from PUT',
          description: 'Trial description',
        }
        chai
          .request(app)
          .put(`/EXAMPLEs/${exampleId}`)
          .set({ token })
          .send(inputExample)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('updatedEXAMPLE');
            expect(res.body.updatedEXAMPLE).to.have.property('_id');
            expect(res.body.updatedEXAMPLE).to.have.property('name');
            expect(res.body.updatedEXAMPLE).to.have.property('updated');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message and updatedEXAMPLE) with status 201. Note: UPDATE PATCH', function(done) {
        const inputExample = {
          name: 'Trial Example edited from PATCH',
          description: 'Trial description',
        }
        chai
          .request(app)
          .patch(`/EXAMPLEs/${exampleId}`)
          .set({ token })
          .send(inputExample)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('updatedEXAMPLE');
            expect(res.body.updatedEXAMPLE).to.have.property('_id');
            expect(res.body.updatedEXAMPLE).to.have.property('name');
            expect(res.body.updatedEXAMPLE).to.have.property('updated');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message and deletedEXAMPLE) with status 200. Note: DELETE', function(done) {
        chai
          .request(app)
          .delete(`/EXAMPLEs/${exampleId}`)
          .set({ token })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('deletedEXAMPLE');
            expect(res.body.deletedEXAMPLE).to.have.property('_id');
            expect(res.body.deletedEXAMPLE).to.have.property('name');
            expect(res.body.deletedEXAMPLE).to.have.property('created');
            expect(res.body.deletedEXAMPLE).to.have.property('updated');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
    describe('ERROR', function() {
      before(function(done) {
        Example.create({
          name: 'Trial Example',
          description: 'Trial description',
          created: new Date(),
          updated: new Date()
        })
          .then(function(newEXAMPLE) {
            exampleId = newEXAMPLE._id;
            done();
          })
          .catch(function(err) {
            throw err
          })
      })

      describe('VALIDATION', function() {
        it('should response an object (message: Example validation failed: name: required) with status 400. Note: UPDATE PUT', function(done) {
          const inputExample = {
            name: '',
            description: 'Trial description',
          }
          chai
            .request(app)
            .put(`/EXAMPLEs/${exampleId}`)
            .set({ token })
            .send(inputExample)
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
        it('should response an object (message: Example validation failed: name: required) with status 400. Note: UPDATE PATCH', function(done) {
          const inputExample = {
            name: '',
            description: 'Trial description',
          }
          chai
            .request(app)
            .patch(`/EXAMPLEs/${exampleId}`)
            .set({ token })
            .send(inputExample)
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
      describe('AUTHENTICATION', function() {
        describe('PUT', function() {
          it('should response an object (message: no token assigned) with status 400', function(done) {
            const inputExample = {
              name: 'Trial Example edited from PUT',
              description: 'Trial description',
            }
            chai
              .request(app)
              .put(`/EXAMPLEs/${exampleId}`)
              .send(inputExample)
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
            const inputExample = {
              name: 'Trial Example edited from PUT',
              description: 'Trial description',
            }
            chai
              .request(app)
              .put(`/EXAMPLEs/${exampleId}`)
              .set({ token: tokenNotAllowed })
              .send(inputExample)
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
            const inputExample = {
              name: 'Trial Example edited from PUT',
              description: 'Trial description',
            }
            chai
              .request(app)
              .put(`/EXAMPLEs/${exampleId}`)
              .set({ token: tokenNotRecognized })
              .send(inputExample)
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
        describe('PATCH', function() {
          it('should response an object (message: no token assigned) with status 400', function(done) {
            const inputExample = {
              name: 'Trial Example edited from PATCH',
              description: 'Trial description',
            }
            chai
              .request(app)
              .patch(`/EXAMPLEs/${exampleId}`)
              .send(inputExample)
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
            const inputExample = {
              name: 'Trial Example edited from PATCH',
              description: 'Trial description',
            }
            chai
              .request(app)
              .patch(`/EXAMPLEs/${exampleId}`)
              .set({ token: tokenNotAllowed })
              .send(inputExample)
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
            const inputExample = {
              name: 'Trial Example edited',
              description: 'Trial description',
            }
            chai
              .request(app)
              .patch(`/EXAMPLEs/${exampleId}`)
              .set({ token: tokenNotRecognized })
              .send(inputExample)
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
        describe('DELETE', function() {
          it('should response an object (message: no token assigned) with status 400', function(done) {
            chai
              .request(app)
              .delete(`/EXAMPLEs/${exampleId}`)
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
              .delete(`/EXAMPLEs/${exampleId}`)
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
              .delete(`/EXAMPLEs/${exampleId}`)
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
      // describe('AUTHORIZATION', function() {
      //   it('should response an object (message: unauthorized to access) with status 401. Note: UPDATE PUT', function(done) {
      //     const inputExample = {
      //       name: 'Trial Example edited from PUT',
      //     }
      //     chai
      //       .request(app)
      //       .put(`/EXAMPLEs/${exampleId}`)
      //       .set({ token: tokenUser })
      //       .send(inputExample)
      //       .then(res => {
      //         expect(res).to.have.status(401);
      //         expect(res.body).to.be.an('object');
      //         expect(res.body).to.have.property('message');
      //         done();
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       })
      //   })
      //   it('should response an object (message: unauthorized to access) with status 401. Note: UPDATE PATCH', function(done) {
      //     const inputExample = {
      //       name: 'Trial Example edited from PATCH',
      //     }
      //     chai
      //       .request(app)
      //       .patch(`/EXAMPLEs/${exampleId}`)
      //       .set({ token: tokenUser })
      //       .send(inputExample)
      //       .then(res => {
      //         expect(res).to.have.status(401);
      //         expect(res.body).to.be.an('object');
      //         expect(res.body).to.have.property('message');
      //         done();
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       })
      //   })
      //   it('should response an object (message: unauthorized to access) with status 401. Note: DELETE', function(done) {
      //     chai
      //       .request(app)
      //       .delete(`/EXAMPLEs/${exampleId}`)
      //       .set({ token: tokenUser })
      //       .then(res => {
      //         expect(res).to.have.status(401);
      //         expect(res.body).to.be.an('object');
      //         expect(res.body).to.have.property('message');
      //         done();
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       })
      //   })
      // })
      describe('NOT FOUND', function() {
        before(function(done) {
          clearExample(done);
        })

        it('should response an object (message: data not found) with status 404. Note: UPDATE PUT', function(done) {
          const inputExample = {
            name: 'Trial Example edited from PUT',
            description: 'Trial description',
          }
          chai
            .request(app)
            .put(`/EXAMPLEs/${exampleId}`)
            .set({ token })
            .send(inputExample)
            .then(res => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('message');
              done();
            })
            .catch(err => {
              console.log(err);
            })
        })
        it('should response an object (message: data not found) with status 404. Note: UPDATE PATCH', function(done) {
          const inputExample = {
            name: 'Trial Example edited from PUT',
            description: 'Trial description',
          }
          chai
            .request(app)
            .patch(`/EXAMPLEs/${exampleId}`)
            .set({ token })
            .send(inputExample)
            .then(res => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('message');
              done();
            })
            .catch(err => {
              console.log(err);
            })
        })
        it('should response an object (message: data not found) with status 404. Note: DELETE', function(done) {
          chai
            .request(app)
            .delete(`/EXAMPLEs/${exampleId}`)
            .set({ token })
            .then(res => {
              expect(res).to.have.status(404);
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
})
