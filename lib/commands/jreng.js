
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
    const name = argv._[1];

    try{
        if (argv._.length < 2) {
            spinner.warn(chalk.yellow('kasih nama dong projectnya'))
        } else if (!RegExp(/^[a-z0-9]+$/i).test(argv._[1])) {
            spinner.warn(chalk.yellow('nama projectnya yang gampang aja'))
        } else if (fs.existsSync(path.join(process.cwd(), `./${name}`))) {
            spinner.warn(chalk.yellow(`ganti dong, folder yang namanya ${name} udah ada :(`))
        } else {
            console.clear()
            
            spinner.text = chalk.green('nyiapin folder project')
            createFolder(`./${name}`)
            spinner.succeed()

            spinner.text = chalk.green('buat folder server di project')
            spinner.start()
            createFolder(`./${name}/server`)
            spinner.succeed()

            spinner.text = chalk.green('buat folder client di project')
            spinner.start()
            createFolder(`./${name}/client`)
            spinner.succeed()

            spinner.text = chalk.yellow('copying server')
            
            spinner.spinner = 'star'
            spinner.start()
            await copyDirectory('../../cms/server',`./${name}/server`)
            spinner.text = chalk.green('copas server beres')
            spinner.succeed()

            //////source harus dirubah, hilangkan sulap-frontend
            spinner.text = chalk.yellow('copying client')
            spinner.spinner = 'moon'
            spinner.start()
            await copyDirectory('../../cms/client/sulap-frontend',`./${name}/client`)
            spinner.text = chalk.green('copas client beres')
            spinner.succeed()

            //installing dependencies
            spinner.text = chalk.yellow('installing server depedency')
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
            };
            spinner.start()
            let packageJSONdestination = path.join(process.cwd(), `./${name}/server`)
            await runShellCommand(`npm --prefix ${packageJSONdestination} install ${packageJSONdestination}`)
            spinner.text = chalk.green('installing success')
            spinner.succeed()

            //installing dependencies
            packageJSONdestination = path.join(process.cwd(), `./${name}/client`)
            
            spinner.text = chalk.yellow('installing client depedency')
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
            };
            spinner.start()
            await runShellCommand(`npm --prefix ${packageJSONdestination} install ${packageJSONdestination}`)
            spinner.text = chalk.green('install dependencies client berhasil')
            spinner.succeed()

            spinner.text = chalk.yellow('buatin package json')
            spinner.spinner = 'weather'
            spinner.start()
            await copyDirectory('../../lib/resources/package.json',`./${name}/package.json`)
            spinner.text = chalk.green('package json dibuat')
            spinner.succeed()

            // asking db name
            const answer = await prompt({
                type: 'text',
                name: 'database',
                message: chalk.blue(`Nama database-nya mau apa?`),
                initial: `sulapjs`,
            })

            let serverConfig = fs.readFileSync(cwdPath(`./${name}/server/config/index.js`), 'utf8')
            serverConfig = serverConfig.replace(/\/\*databaseName\*\//g, `'mongodb://localhost:27017/${answer.database}' \n     \/\*databaseName\*\/ ||`)
            fs.writeFileSync(cwdPath(`./${name}/server/config/index.js`), serverConfig)
            
            let str = `${chalk.blue(`🎉 yeay! project kamu berhasil dibuat! 🎩🐇`)}\n\n${chalk.green('untuk memulai server dan client')}:\n- cd ${name}\n- npm komang\n\n${chalk.green('untuk memulai server aja')}:\n- cd ${name}/server\n- npm start\n\n${chalk.green('untuk memulai client aja')}:\n- cd ${name}/client\n- npm start`

            console.log(boxen(str, { padding: 1, borderColor: 'green', borderStyle: 'round' }));
            
        }   
    } catch(err){
        console.log(err)
        spinner.fail()
    }
}
