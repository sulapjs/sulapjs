
const fs = require('fs')
const path = require('path')
const ora = require('ora');
const prompt = require('prompts')
let spinner = ora()

const { createFolder,
        copyDirectory,
        dirPath,
        cwdPath } = require('../functions/directory.js')
const {
    createModelClient,
    createModelDetailsClient,
    changeClientRoute,
    editSidebarList
        } = require('../functions/regex/client.js')
const { runShellCommand } = require('../functions/shell.js')

module.exports = async function jreng(argv) {
    spinner.spinner = 'moon'
    spinner.text = 'creating server and client'
    spinner.start()
    
    try{
        if (argv._.length < 2) {
            spinner.stop()
            console.log('kasih nama dong projectnya')
        } else if (!RegExp(/^[a-z0-9]+$/i).test(argv._[1])) {
            spinner.stop()
            console.log('nama projectnya yang gampang aja')
        } else {
            const name = argv._[1]
            createFolder(`./${name}`)
            createFolder(`./${name}/client`)
            createFolder(`./${name}/server`)

            spinner.text = 'copying'
            spinner.spinner = 'simpleDots'
            spinner.start()
            await copyDirectory('../../cms/server',`./${name}/server`)
            spinner.succeed()

            //////source harus dirubah, hilangkan sulap-frontend
            spinner.text = 'copying'
            spinner.spinner = 'simpleDots'
            spinner.start()
            await copyDirectory('../../cms/client/sulap-frontend',`./${name}/client`) 
            spinner.succeed()

            //installing dependencies
            spinner.text = 'installing server depedency'
            spinner.spinner = 'moon';
            spinner.start()
            let packageJSONdestination = path.join(process.cwd(), `./${name}/server`)
            await runShellCommand(`npm --prefix ${packageJSONdestination} install ${packageJSONdestination}`)
            spinner.text = 'installing success'
            spinner.succeed()

            //installing dependencies
            packageJSONdestination = path.join(process.cwd(), `./${name}/client`)
            
            spinner.text = 'installing client depedency'
            spinner.spinner = 'moon';
            spinner.start()
            // await runShellCommand(`npm --prefix ${packageJSONdestination} install ${packageJSONdestination}`)
            spinner.text = 'installing success'
            spinner.succeed()

            // asking db name
            const answer = await prompt({
                type: 'text',
                name: 'database',
                message: `What's your database name?`,
                initial: `sulapjs`,
                format: v => `${v}`
            })
            // console.log(answer.database) //--> nama database
            let serverConfig = fs.readFileSync(cwdPath(`./${name}/server/config/index.js`), 'utf8')
            // console.log(serverConfig, 'serverConfig')
            serverConfig = serverConfig.replace(/\/\*databaseName\*\//g, `'mongodb://localhost:27017/${answer.database}' \n     \/\*databaseName\*\/ ||`)
            console.log(serverConfig)
            fs.writeFileSync(cwdPath(`./${name}/server/config/index.js`), serverConfig)
    
            
        }   
    } catch(err){
        console.log(err)
        spinner.fail()
    }
}
