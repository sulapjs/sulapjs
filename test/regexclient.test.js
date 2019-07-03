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
      regexclient.changeClientRoute(component, modelName, sample);
      const replaced = fs.readFileSync(destpath, 'utf8');

      expect(fse.existsSync(destpath)).to.equals(true);
      expect(replaced).not.to.equals(oriComponent);
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
      regexclient.editSidebarList(component, attributes, sample);
      const replaced = fs.readFileSync(destpath, 'utf8');

      expect(fse.existsSync(destpath)).to.equals(true);
      expect(replaced).not.to.equals(oriComponent);
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
      regexclient.createModelDetailsClient(srcrel, attributes, modelName, sample);
      const replaced = fs.readFileSync(dirpath, 'utf8');

      expect(fse.existsSync(dirpath)).to.equals(true);
      expect(replaced).not.to.equals(oriComponent);
    })
  })

  describe('CREATE MODEL CLIENT', function() {
    const srcrel = '../../resources/components/templateModel.txt';
    const srcpath = path.join(__dirname, '../lib/resources/components/templateModel.txt');
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
    
    it('successfully creates model client', function() {
      regexclient.createModelClient(srcrel, attributes, modelName, sample);
      const replaced = fs.readFileSync(dirpath, 'utf8');

      expect(fse.existsSync(dirpath)).to.equals(true);
      expect(replaced).not.to.equals(oriComponent);
    })
  })
})
