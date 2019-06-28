const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
const Example = require('../models/example');
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

  describe('GET /examples and GET /examples/:id', function() {
    describe('SUCCESS', function() {
      before(function(done) {
        Example.create({
          name: 'Trial Example',
          description: 'Trial description',
          created: new Date(),
          updated: new Date()
        })
          .then(function(newExample) {
            exampleId = newExample._id;
            done();
          })
          .catch(function(err) {
            throw err
          })
      })
      after(function(done) {
        clearExample(done);
      })
      it('should response an object (message, examples) with status 200', function(done) {
        chai
          .request(app)
          .get('/examples')
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('examples');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message, example) with status 200', function(done) {
        chai
          .request(app)
          .get(`/examples/${exampleId}`)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('example');
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
          .get('/examples')
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
          .get(`/examples/${exampleId}`)
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

  describe('POST /examples', function() {
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
      it('should response an object (message and newExample) with status 201', function(done) {
        const inputExample = {
          name: 'New Example',
          description: 'Trial description',
        }
        chai
          .request(app)
          .post('/examples')
          .set({ token })
          .send(inputExample)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('newExample');
            expect(res.body.newExample).to.have.property('_id');
            expect(res.body.newExample).to.have.property('name');
            expect(res.body.newExample).to.have.property('description');
            expect(res.body.newExample).to.have.property('refId');
            expect(res.body.newExample).to.have.property('created');
            expect(res.body.newExample).to.have.property('updated');
            expect(res.body.newExample.refId).to.be.an('object');
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
            .post('/examples')
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
            .post('/examples')
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
            .post('/examples')
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
            .post('/examples')
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

  describe('PUT PATCH DELETE /examples/:id', function() {
    describe('SUCCESS', function() {
      before(function(done) {
        Example.create({
          name: 'Trial Example',
          description: 'Trial description',
          created: new Date(),
          updated: new Date()
        })
          .then(function(newExample) {
            exampleId = newExample._id;
            done();
          })
          .catch(function(err) {
            throw err
          })
      })

      it('should response an object (message and updatedExample) with status 201. Note: UPDATE PUT', function(done) {
        const inputExample = {
          name: 'Trial Example edited from PUT',
          description: 'Trial description',
        }
        chai
          .request(app)
          .put(`/examples/${exampleId}`)
          .set({ token })
          .send(inputExample)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('updatedExample');
            expect(res.body.updatedExample).to.have.property('_id');
            expect(res.body.updatedExample).to.have.property('name');
            expect(res.body.updatedExample).to.have.property('updated');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message and updatedExample) with status 201. Note: UPDATE PATCH', function(done) {
        const inputExample = {
          name: 'Trial Example edited from PATCH',
          description: 'Trial description',
        }
        chai
          .request(app)
          .patch(`/examples/${exampleId}`)
          .set({ token })
          .send(inputExample)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('updatedExample');
            expect(res.body.updatedExample).to.have.property('_id');
            expect(res.body.updatedExample).to.have.property('name');
            expect(res.body.updatedExample).to.have.property('updated');
            done();
          })
          .catch(err => {
            console.log(err);
          })
      })
      it('should response an object (message and deletedExample) with status 200. Note: DELETE', function(done) {
        chai
          .request(app)
          .delete(`/examples/${exampleId}`)
          .set({ token })
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('deletedExample');
            expect(res.body.deletedExample).to.have.property('_id');
            expect(res.body.deletedExample).to.have.property('name');
            expect(res.body.deletedExample).to.have.property('created');
            expect(res.body.deletedExample).to.have.property('updated');
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
          .then(function(newExample) {
            exampleId = newExample._id;
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
            .put(`/examples/${exampleId}`)
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
            .patch(`/examples/${exampleId}`)
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
              .put(`/examples/${exampleId}`)
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
              .put(`/examples/${exampleId}`)
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
              .put(`/examples/${exampleId}`)
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
              .patch(`/examples/${exampleId}`)
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
              .patch(`/examples/${exampleId}`)
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
              .patch(`/examples/${exampleId}`)
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
              .delete(`/examples/${exampleId}`)
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
              .delete(`/examples/${exampleId}`)
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
              .delete(`/examples/${exampleId}`)
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
      //       .put(`/examples/${exampleId}`)
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
      //       .patch(`/examples/${exampleId}`)
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
      //       .delete(`/examples/${exampleId}`)
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
            .put(`/examples/${exampleId}`)
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
            .patch(`/examples/${exampleId}`)
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
            .delete(`/examples/${exampleId}`)
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
