const chai = require('chai');
const { expect } = chai;

const shell = require('../lib/functions/shell');

describe('RUN SHELL', function() {
  it ('returns object after running', function() {
    shell.runShellCommand('ls')
      .then((data) => {
        expect(data).to.be.an('object')
        expect(data).to.have.property('stdout')
        expect(data).to.have.property('stderr')
      })
      .catch((err) => {
        console.log(err);
      })
  })
})