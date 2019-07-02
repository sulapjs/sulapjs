const chai = require('chai');
const { expect } = chai;
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const regex = require('../lib/functions/regex');

describe('TO Pascal Case', function() {
  it(`returns 'Pascal' with input 'pascal'`, function() {
    expect(regex.toPascalCase('pascal')).to.equals('Pascal');
  })
  it(`returns 'Pascal-Again' with input 'pascal-again'`, function() {
    expect(regex.toPascalCase('pascal-again')).to.equals('Pascal-Again');
  })
  it(`returns 'Pascal Again' with input 'pascal again'`, function() {
    expect(regex.toPascalCase('pascal again')).to.equals('Pascal Again');
  })
})

describe('READ AND WRITE FILE', function() {
  const sample = 'sample.js';
  const dirpath = path.join(process.cwd(), sample);
  const dirname = path.join(__dirname, '../lib/functions/regex');

  after(function() {
    fse.removeSync(dirpath);
  })
  describe('WRITE FILE', function() {
    regex.writeFile(sample, `console.log('sample')`);
    const read = fs.readFileSync(dirpath, 'utf8');

    it('successfully writes file', function() {
      expect(fse.existsSync(dirpath)).to.equals(true);
      expect(read).to.equals(`console.log('sample')`);
    })
  })
  describe('READ FILE', function() {
    const destpath = path.join(dirname, sample);
    before(function() {
      fs.writeFileSync(destpath, `console.log('sample')`)
    })
    after(function() {
      fse.removeSync(destpath);
    })
    it('successfully reads file', function() {
      expect(regex.readFile(sample)).to.equals(`console.log('sample')`);
    })
  })
})
