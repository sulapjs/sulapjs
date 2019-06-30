
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
        } = require('../functions/regex')
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
            // await runShellCommand(`npm --prefix ${packageJSONdestination} install ${packageJSONdestination}`)
            spinner.text = 'installing success'
            spinner.succeed()

            //installing dependencies
            packageJSONdestination = path.join(process.cwd(), `./${argv.name}/client`)
            
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
            let serverConfig = fs.readFileSync(cwdPath(`./${argv.name}/server/config/index.js`), 'utf8')
            // console.log(serverConfig, 'serverConfig')
            serverConfig = serverConfig.replace(/\/\*databaseName\*\//g, `'mongodb://localhost:27017/${answer.database}' \n     \/\*databaseName\*\/ ||`)
            console.log(serverConfig)
            fs.writeFileSync(cwdPath(`./${argv.name}/server/config/index.js`), serverConfig)
        
        
            //to be moved later --> after command jreng
            createModelClient('../resources/components/templateModel.txt', 
                                [ 'Title', 'Description' ], 
                                'Product', 
                                `./${argv.name}/client/src/components/Product.js`)
            createModelDetailsClient('../resources/components/templateModelDetails.txt', 
                                { Title:'String', Description:'String'},
                                `./${argv.name}/client/src/components/ProductDetails.js`)
            changeClientRoute(`./${argv.name}/client/src/components/DashBoardContent.js`, 
                                    'Product')

            editSidebarList(`./${argv.name}/client/src/components/SidebarDashboard.js`, 'Product')
        }   
    } catch(err){
        console.log(err)
        spinner.fail()
    }
}
