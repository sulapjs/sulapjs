const ora = require('ora');
let spinner = ora()
const { promisify } = require('util')
const exec = promisify(require('child_process').exec);

module.exports = function (argv) {
  spinner.spinner = 'moon'
  spinner.text = 'your app is running...'
  spinner.start()
  exec('npm run komang')
    .then(() => {
      spinner.succeed()    
    })
    .catch((err) => {
      spinner.fail()    
    })
}