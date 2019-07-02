
const fs = require('fs')
const path = require('path')
const ora = require('ora');
const prompt = require('prompts')
let spinner = ora()
const chalk = require('yargonaut').chalk()
const boxen = require('boxen');

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
            spinner.warn(chalk.yellow('kasih nama dong projectnya'))
        } else if (!RegExp(/^[a-z0-9]+$/i).test(argv._[1])) {
            spinner.warn(chalk.yellow('nama projectnya yang gampang aja'))
        } else if (fs.existsSync(path.join(process.cwd(), `./${name}`))) {
            spinner.stop()
            console.log(`folder name ${name} already exists :(`)
        } else {
            spinner.text = 'buat folder project'
            createFolder(`./${name}`)
            spinner.succeed()

            spinner.text = 'buat folder server di project'
            spinner.start()
            createFolder(`./${name}/server`)
            spinner.succeed()

            spinner.text = 'buat folder client di project'
            spinner.start()
            createFolder(`./${name}/client`)
            spinner.succeed()

            spinner.text = chalk.green('copying server')
            
            spinner.spinner = {
                // Optional
                interval: 600,
                frames: [
                    "🚶    🦖 ",
                    " 🚶  🦖  ",
                    "  🏃🦖   ",
                    " 🚶  🦖  ",
                    "🏃    🦖 ",
                ]
            }
            spinner.start()
            await copyDirectory('../../cms/server',`./${name}/server`)
            spinner.succeed()

            //////source harus dirubah, hilangkan sulap-frontend
            spinner.text = 'copying'
                spinner.spinner = {
                // Optional
                interval: 600,
                frames: [
                    "🚶    🐓 ",
                    " 🚶  🐓  ",
                    "  🏃🐓   ",
                    " 🚶  🐓  ",
                    "🏃    🐓 ",
                ]
            }
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
            spinner.spinner = 'weather';
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
            })
            // console.log(answer.database) //--> nama database
            let serverConfig = fs.readFileSync(cwdPath(`./${name}/server/config/index.js`), 'utf8')
            // console.log(serverConfig, 'serverConfig')
            serverConfig = serverConfig.replace(/\/\*databaseName\*\//g, `'mongodb://localhost:27017/${answer.database}' \n     \/\*databaseName\*\/ ||`)
            console.log(serverConfig)
            fs.writeFileSync(cwdPath(`./${name}/server/config/index.js`), serverConfig)
            
            let str = `${chalk.blue(`🎉 yeay! project kamu berhasil dibuat! 🎩🐇`)}\n\n${chalk.green('untuk memulai server dan client')}:\n- cd ${name}\n- npm komang\n\n${chalk.green('untuk memulai server aja')}:\n- cd ${name}/server\n- npm start\n\n${chalk.green('untuk memulai client aja')}:\n- cd ${name}/client\n- npm start`

            console.log(boxen(str, { padding: 1, borderColor: 'green', borderStyle: 'round' }));
            
        }   
    } catch(err){
        console.log(err)
        spinner.fail()
    }
}
