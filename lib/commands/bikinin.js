
const fs = require('fs')
const path = require('path')
const ora = require('ora');
let spinner = ora()

const { createFolder,
        copyDirectory } = require('../functions/directory.js')
const { runShellCommand } = require('../functions/shell.js')
const { createModelClient,
        createModelDetailsClient,
        changeClientRoute,
        editSidebarList } = require('../functions/regex/client')
const { toPascalCase } = require('../functions/regex')

const { addNewModelController,
        addRouting,
        addRoutingIndex,
        addModel,
        addAuthorizationModel } = require('../functions/regex/server')

module.exports = async function bikinin(argv) {
    try {
        if (argv.model === true || argv.model === '') {
            throw new Error('model perlu nama')
        } else if (!RegExp(/^[a-z0-9]+$/i).test(argv.model)) {
            throw new Error('nama modelnya yang gampang aja')
        } else if (argv.attributes === true) {
            throw new Error('attributes perlu nama')
        } else if (argv.attributes === '') {
            throw new Error('attributes ga boleh string kosong')
        } else if (argv.model === 'user') {
            throw new Error('model user already exists')
        } else if (!fs.existsSync(path.join(process.cwd(), './client'))) {
            throw new Error('please change directory to project folder first')
        }

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
                type.toLowerCase() !== 'float'
            ) {
                throw new Error('invalid type')
            }

            return {
                name,
                type
            }

            // readAndReplace('../models/test-model.js', `${name}: ${type}`)
        })
        console.log(modelObject)
        console.log('model sudah dibuat')

        //client side commands ==> must be executed inside the folder
        createModelClient('../../resources/components/templateModel.txt',
                //['Title', 'Description']
                modelObject, 
                argv.model, 
                `./client/src/components/${ toPascalCase(argv.model)}.js`)
        createModelDetailsClient('../../resources/components/templateModelDetails.txt', 
                //{ Title:'String', Description:'String'},
                modelObject,
                `./client/src/components/${toPascalCase(argv.model)}Detail.js`)

        changeClientRoute(`./client/src/components/DashBoardContent.js`, 
                    argv.model)

        editSidebarList(`./client/src/components/SidebarDashboard.js`, argv.model)

        spinner.text = 'copying client files'
        spinner.spinner = 'simpleDots'
        spinner.start()
        spinner.succeed()

        
        addRoutingIndex('./server/routes/index.js', argv.model)
        addRouting(`../../resources/server/example-route.js`, `./server/routes/${argv.model.toLowerCase()}.js`, argv.model.toLowerCase())
        addNewModelController(`../../resources/server/example-controller.js`, `./server/controllers/${argv.model.toLowerCase()}.js`, argv.model.toLowerCase(), modelObject)
        addModel(`../../resources/server/example-schema.js`, `./server/models/${toPascalCase(argv.model)}.js`, argv.model.toLowerCase(), modelObject)
        addAuthorizationModel(`../../resources/server/example-authorization.js`, `./server/middlewares/${argv.model.toLowerCase()}Auth.js`, argv.model.toLowerCase())

    } catch (error) {
        console.log(error.message)
    }
}