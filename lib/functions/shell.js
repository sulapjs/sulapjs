const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');
let spinner = ora();

async function runShellCommand(command) {    
    
    return await exec(command);
    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);
    
}

module.exports = { runShellCommand }
