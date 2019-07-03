
const fs = require('fs')
const path = require('path')
const ora = require('ora');
const chalk = require('yargonaut').chalk()
let spinner = ora()

const { createFolder,
    copyDirectory } = require('../functions/directory.js')
const { runShellCommand } = require('../functions/shell.js')
const { createModelClient,
    createModelDetailsClient,
    changeClientRoute,
    editSidebarList,
    editDashboardHome
} = require('../functions/regex/client')
const { toPascalCase } = require('../functions/regex')

const { addNewModelController,
    addRouting,
    addRoutingIndex,
    addModel,
    addAuthorizationModel,
    generateDocumentation } = require('../functions/regex/server')

module.exports = async function bikinin(argv) {
    try {
        if (argv.model === true || argv.model === '') {
            spinner.warn(chalk.yellow('model perlu nama'))
        } else if (!RegExp(/^[a-z0-9]+$/i).test(argv.model)) {
            spinner.warn(chalk.yellow('nama modelnya yang gampang aja'))
        } else if (argv.attributes === true) {
            spinner.warn(chalk.yellow('attributes perlu nama'))
        } else if (argv.attributes === '') {
            spinner.warn(chalk.yellow('attributes ga boleh string kosong'))
        } else if (argv.model.toLowerCase() === 'user') {
            spinner.warn(chalk.yellow('model user already exists'))
        } else if (!fs.existsSync(path.join(process.cwd(), './client'))
            || !fs.existsSync(path.join(process.cwd(), './server'))) {
            spinner.warn(chalk.yellow('please change directory to project folder first'))
        } else {

        let modelItems = argv.attributes.split(',')

        let modelObject = modelItems.map(el => {
            const [name, type] = el.split(':')

            if (name === '' || !RegExp(/^[a-z0-9]+$/i).test(name)) {
                throw new Error('nama key modelnya yang gampang aja')
            }

            if (
                type.toLowerCase() !== 'string' &&
                type.toLowerCase() !== 'boolean' &&
                type.toLowerCase() !== 'number' &&
                type.toLowerCase() !== 'text' &&
                type.toLowerCase() !== 'image'
            ) {
                throw new Error('invalid type')
            }

            return {
                name,
                type
            }
        })


        spinner.text = chalk.green('tambah model di sidebar client')
        spinner.succeed();

        addRoutingIndex('./server/routes/index.js', argv.model)
        addRouting(`../../resources/server/example-route.js`, `./server/routes/${argv.model.toLowerCase()}.js`, argv.model.toLowerCase())

        //adding documentation in project
        spinner.text = chalk.green('documentation generated for generated model')
        spinner.succeed()
        addNewModelController(`../../resources/README.md`, 
            `./${argv.model.toLowerCase()}.js`, 
            argv.model.toLowerCase(), 
            modelObject)
        generateDocumentation(
            `../../resources/README.md`, 
            `./README.md`, 
            argv.model.toLowerCase(), 
            modelObject)


        spinner.text = chalk.green('buat component model baru di client')
        spinner.succeed();

        //client side commands ==> must be executed inside the folder
        changeClientRoute(
            `./client/src/components/DashBoardContent.js`, 
            argv.model, `./client/src/components/${ toPascalCase(argv.model)}.js`)
        editSidebarList(
            `./client/src/components/SidebarDashboard.js`, 
            argv.model, 
            `./client/src/components/${ toPascalCase(argv.model)}.js`)
        createModelClient(
            '../../resources/components/templateModel.txt',
            modelObject, 
            argv.model, 
            `./client/src/components/${ toPascalCase(argv.model)}.js`)
        createModelDetailsClient(
            '../../resources/components/templateModelDetails.txt', 
            modelObject,
            toPascalCase(argv.model),
            `./client/src/components/${toPascalCase(argv.model)}Detail.js`)

        //server side command => to be executed inside project folder
        spinner.text = chalk.green('tambah route model baru di server')
        spinner.succeed();

        addNewModelController(`../../resources/server/example-controller.js`, 
            `./server/controllers/${argv.model.toLowerCase()}.js`, 
            argv.model.toLowerCase(), 
            modelObject)
        addModel(`../../resources/server/example-schema.js`, 
            `./server/models/${toPascalCase(argv.model)}.js`, 
            argv.model.toLowerCase(), 
            modelObject)
        addAuthorizationModel(
            `../../resources/server/example-authorization.js`, 
            `./server/middlewares/${argv.model.toLowerCase()}Auth.js`, 
            argv.model.toLowerCase())

        spinner.text = chalk.green('tambah schema model baru di server')
        spinner.succeed();
        }


    } catch (error) {
        console.log(error)
        spinner.fail()        
    }
}