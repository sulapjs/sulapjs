
const fs = require('fs')
const path = require('path')
const ora = require('ora');
const prompt = require('prompts')
let spinner = ora()

const { createFolder,
        copyDirectory } = require('../functions/directory.js')
const { runShellCommand } = require('../functions/shell.js')

module.exports = async function jreng(argv) {
    spinner.spinner = 'moon'
    spinner.text = 'creating server and client'
    spinner.start()
    
    try{
        if(argv.name == true){
            spinner.stop()
            throw new Error('masukkan nama folder')
        } else if (argv.name === '') {
            spinner.stop()
            throw new Error('nama project ga boleh string kosong')
        } else {
            createFolder(`./${argv.name}`)
            createFolder(`./${argv.name}/client`)
            createFolder(`./${argv.name}/server`)

            spinner.text = 'copying'
            spinner.spinner = 'simpleDots'
            spinner.start()
            await copyDirectory('../../cms/server',`./${argv.name}/server`)
            spinner.succeed()

            //////source harus dirubah, hilangkan sulap-frontend
            spinner.text = 'copying'
            spinner.spinner = 'simpleDots'
            spinner.start()
            await copyDirectory('../../cms/client/sulap-frontend',`./${argv.name}/client`) 
            spinner.succeed()

            //installing dependencies
            spinner.text = 'installing server depedency'
            spinner.spinner = 'moon';
            spinner.start()
            let packageJSONdestination = path.join(process.cwd(), `./${argv.name}/server`)
            await runShellCommand(`npm --prefix ${packageJSONdestination} install ${packageJSONdestination}`)
            spinner.text = 'installing success'
            spinner.succeed()

            //installing dependencies
            packageJSONdestination = path.join(process.cwd(), `./${argv.name}/client`)
            
            spinner.text = 'installing client depedency'
            spinner.spinner = 'moon';
            spinner.start()
            await runShellCommand(`npm --prefix ${packageJSONdestination} install ${packageJSONdestination}`)
            spinner.text = 'installing success'
            spinner.succeed()

            // asking db name
            await prompt({
                type: 'text',
                name: 'database',
                message: `What's your database name?`,
                initial: `sulapjs`,
                format: v => `@${v}`
            })
        }
    } catch(err){
        console.log(err)
        spinner.fail()
    }
}
