const chai = require('chai');
const { expect } = chai;
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const regexclient = require('../lib/functions/regex/client');

describe('REGEX CLIENT', function() {
  const sample = 'sample.js';  
  const modelName = 'sample';
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
      name: 'status',
      type: 'boolean',
    },
  ]

  describe('CHANGE CLIENT ROUTE', function() {
    const component = 'DashBoardContent.js';
    const srcpath = path.join(__dirname, '../cms/client/sulap-frontend/src/components/DashBoardContent.js');
    const destpath = path.join(process.cwd(), component);
    const oriComponent = fs.readFileSync(srcpath, 'utf8');

    before(function() {
      fse.copySync(srcpath, destpath);
    })
    after(function() {
      fse.removeSync(destpath);
    })
    
    it('successfully changes client route', function() {
      const feedback = regexclient.changeClientRoute(component, modelName, sample);
      const replaced = fs.readFileSync(destpath, 'utf8');

      expect(fse.existsSync(destpath)).to.equal(true);
      expect(replaced).not.to.equal(oriComponent);
      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('created');
    })

    it('fails changing client route', function() {
      const samplepath = (process.cwd(), sample);
      fs.writeFileSync(samplepath, `\/\/${sample}`);
      const feedback = regexclient.changeClientRoute(component, modelName, sample);

      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('file already exist');
      fse.removeSync(samplepath);      
    })
  })

  describe('EDIT SIDEBAR LIST', function() {
    const component = 'SidebarDashboard.js';
    const srcpath = path.join(__dirname, '../cms/client/sulap-frontend/src/components/SidebarDashboard.js');
    const destpath = path.join(process.cwd(), component);
    const oriComponent = fs.readFileSync(srcpath, 'utf8');

    before(function() {
      fse.copySync(srcpath, destpath);
    })
    after(function() {
      fse.removeSync(destpath);
    })
    
    it('successfully edits sidebar list', function() {
      const feedback = regexclient.editSidebarList(component, attributes, sample);
      const replaced = fs.readFileSync(destpath, 'utf8');

      expect(fse.existsSync(destpath)).to.equal(true);
      expect(replaced).not.to.equal(oriComponent);
      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('created');
    })

    it('fails editing sidebar list', function() {
      const samplepath = (process.cwd(), sample);
      fs.writeFileSync(samplepath, `\/\/${sample}`);
      const feedback = regexclient.editSidebarList(component, attributes, sample);

      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('file already exist');
      fse.removeSync(samplepath);      
    })
  })

  describe('CREATE MODEL DETAIL CLIENT', function() {
    const srcrel = '../../resources/components/templateModelDetails.txt';
    const srcpath = path.join(__dirname, '../lib/resources/components/templateModelDetails.txt');
    const dirpath = path.join(process.cwd(), sample);
    const oriComponent = fs.readFileSync(srcpath, 'utf8');
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

    after(function() {
      fse.removeSync(dirpath);
    })
    
    it('successfully creates model detail client', function() {
      const feedback = regexclient.createModelDetailsClient(srcrel, attributes, modelName, sample);
      const replaced = fs.readFileSync(dirpath, 'utf8');

      expect(fse.existsSync(dirpath)).to.equal(true);
      expect(replaced).not.to.equal(oriComponent);
      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('created');
    })

    it('fails creating model detail client', function() {
      const samplepath = (process.cwd(), sample);
      fs.writeFileSync(samplepath, `\/\/${sample}`);
      const feedback = regexclient.createModelDetailsClient(srcrel, attributes, modelName, sample);

      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('file already exist');
      fse.removeSync(samplepath);      
    })
  })

  describe('CREATE MODEL CLIENT', function() {
    const srcrel = '../../resources/components/templateModel.txt';
    const srcpath = path.join(__dirname, '../lib/resources/components/templateModel.txt');
    const dirpath = path.join(process.cwd(), sample);
    const oriComponent = fs.readFileSync(srcpath, 'utf8');

    after(function() {
      fse.removeSync(dirpath);
    })
    
    it('successfully creates model client', function() {
      const feedback = regexclient.createModelClient(srcrel, attributes, modelName, sample);
      const replaced = fs.readFileSync(dirpath, 'utf8');

      expect(fse.existsSync(dirpath)).to.equal(true);
      expect(replaced).not.to.equal(oriComponent);
      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('created');
    })
    
    it('fails creating model client', function() {
      const samplepath = (process.cwd(), sample);
      fs.writeFileSync(samplepath, `\/\/${sample}`);
      const feedback = regexclient.createModelClient(srcrel, attributes, modelName, sample);

      expect(feedback).to.be.an('object');
      expect(feedback).to.have.property('message');
      expect(feedback.message).to.equal('file already exist');
      fse.removeSync(samplepath);      
    })
  })
})
