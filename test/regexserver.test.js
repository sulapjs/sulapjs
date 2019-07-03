const chai = require('chai');
const { expect } = chai;
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const regexserver = require('../lib/functions/regex/server');

describe('REGEX SERVER', function() {
  describe('ADDING ROUTING INDEX', function() {
    const srcpath = path.join(__dirname, '../cms/server/routes/index.js');
    const sample = 'index.js';
    const destpath = path.join(process.cwd(), sample);
    const modelName = 'sample';

    before(function() {
      fse.copySync(srcpath, destpath);
    })
    after(function() {
      fse.removeSync(destpath);
    })

    it('successfully inserts routing to index file', function() {
      const original = fs.readFileSync(destpath, 'utf8');
      regexserver.addRoutingIndex(sample, modelName);
      const replaced = fs.readFileSync(destpath, 'utf8');

      expect(replaced).to.not.equal(original);
    })
  })

  describe('ADDING ROUTING AND AUTHORIZATION MODEL', function(){
    const destrelpath = 'index.js';
    const modelName = 'sample';
    const dirpath = path.join(process.cwd(), destrelpath);
    const dirname = path.join(__dirname, '../lib/functions/regex');

    describe('ADDING ROUTING', function() {
      const srcrelpath = '../../resources/server/example-route.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      after(function() {
        fse.removeSync(dirpath);
      })

      it('successfully adds routing folder and files from template with injected model name', function() {
        const feedback = regexserver.addRouting(srcrelpath, destrelpath, modelName);
  
        expect(fse.existsSync(dirpath)).to.equal(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equal(srcFile);
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file created');
      })

      it('fails adding routing folder and files from template with injected model name', function() {
        const feedback = regexserver.addRouting(srcrelpath, destrelpath, modelName);
  
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file exists, remove or rename file first');
      })
    })

    describe('ADDING AUTHORIZATION MODEL', function() {
      const srcrelpath = '../../resources/server/example-authorization.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      after(function() {
        fse.removeSync(dirpath);
      })

      it('successfully adds authorization model from template with injected model name', function() {
        const feedback = regexserver.addAuthorizationModel(srcrelpath, destrelpath, modelName);
  
        expect(fse.existsSync(dirpath)).to.equal(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equal(srcFile);
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file created');
      })

      it('fails adding authorization model from template with injected model name', function() {
        const feedback = regexserver.addAuthorizationModel(srcrelpath, destrelpath, modelName);
  
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file exists, remove or rename file first');
      })
    })
  })

  describe('ADDING NEW MODEL CONTROLLER AND SCHEMA', function() {
    const destrelpath = 'index.js';
    const modelName = 'sample';
    const dirpath = path.join(process.cwd(), destrelpath);
    const dirname = path.join(__dirname, '../lib/functions/regex');
    const attributes = [
      {
        name: 'title',
        type: 'string',
      },
      {
        name: 'description',
        type: 'string',
      },
      {
        name: 'photo',
        type: 'image',
      },
    ]

    describe('ADDING NEW MODEL CONTROLLER', function() {
      const srcrelpath = '../../resources/server/example-controller.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      after(function() {
        fse.removeSync(dirpath);
      })

      it('successfully adds new model controller file from template with injected model name', function() {
        const feedback = regexserver.addNewModelController(srcrelpath, destrelpath, modelName, attributes);
  
        expect(fse.existsSync(dirpath)).to.equal(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equal(srcFile);
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file created');
      })
      it('fails adding new model controller file from template with injected model name', function() {
        const feedback = regexserver.addNewModelController(srcrelpath, destrelpath, modelName, attributes);
  
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file exists, remove or rename file first');
      })
    })
    
    describe('ADDING NEW MODEL SCHEMA', function() {
      const srcrelpath = '../../resources/server/example-schema.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      after(function() {
        fse.removeSync(dirpath);
      })

      it('successfully adds new model schema file from template with injected model name', function() {
        const feedback = regexserver.addModel(srcrelpath, destrelpath, modelName, attributes);

        expect(fse.existsSync(dirpath)).to.equal(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equal(srcFile);
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file created');
      })
      it('fails adding new model schema file from template with injected model name', function() {
        const feedback = regexserver.addModel(srcrelpath, destrelpath, modelName, attributes);
  
        expect(feedback).to.be.an('object');
        expect(feedback).to.have.property('message');
        expect(feedback.message).to.equal('file exists, remove or rename file first');
      })
    })
  })
})