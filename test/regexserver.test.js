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

      expect(replaced).to.not.equals(original);
    })
  })

  describe('ADDING ROUTING AND AUTHORIZATION MODEL', function(){
    const destrelpath = 'index.js';
    const modelName = 'sample';
    const dirpath = path.join(process.cwd(), destrelpath);
    const dirname = path.join(__dirname, '../lib/functions/regex');

    afterEach(function() {
      fse.removeSync(dirpath);
    })

    describe('ADDING ROUTING', function() {
      const srcrelpath = '../../resources/server/example-route.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      it('successfully adds routing folder and files from template with injected model name', function() {
        
        regexserver.addRouting(srcrelpath, destrelpath, modelName);
  
        expect(fse.existsSync(dirpath)).to.equals(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equals(srcFile);
      })
    })

    describe('ADDING AUTHORIZATION MODEL', function() {
      const srcrelpath = '../../resources/server/example-authorization.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      it('successfully adds routing folder and files from template with injected model name', function() {
        regexserver.addAuthorizationModel(srcrelpath, destrelpath, modelName);
  
        expect(fse.existsSync(dirpath)).to.equals(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equals(srcFile);
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
    ]

    afterEach(function() {
      fse.removeSync(dirpath);
    })

    describe('ADDING NEW MODEL CONTROLLER', function() {
      const srcrelpath = '../../resources/server/example-controller.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      it('successfully adds new model controller file from template with injected model name', function() {
        regexserver.addNewModelController(srcrelpath, destrelpath, modelName, attributes);
  
        expect(fse.existsSync(dirpath)).to.equals(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equals(srcFile);
      })
    })
    
    describe('ADDING NEW MODEL SCHEMA', function() {
      const srcrelpath = '../../resources/server/example-schema.js';
      const srcpath = path.join(dirname, srcrelpath);
      const srcFile = fs.readFileSync(srcpath, 'utf8');

      it('successfully adds new model controller file from template with injected model name', function() {
        regexserver.addModel(srcrelpath, destrelpath, modelName, attributes);

        expect(fse.existsSync(dirpath)).to.equals(true);
        expect(fs.readFileSync(dirpath, 'utf8')).to.not.equals(srcFile);
      })
    })
  })
})