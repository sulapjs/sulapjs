
const fs = require('fs');
const path = require('path');
const { toPascalCase } = require('../../functions/regex/index')



function createModelDetailsClient(pathTemplate, modelStructureInput, relativeDest) {
    const dirJoin = path.join(__dirname, pathTemplate)
    // console.log(dirJoin)
    //{ Title:'String', Description:'String'},
    let modelStructure = {}
    modelStructureInput.map( el => {
        modelStructure[toPascalCase(el.name)] = toPascalCase(el.type)
    })

    const read = fs.readFileSync(dirJoin, 'utf8')
    const replaced = read.replace(/\/\/model-info/i, `const modelInfo = ${JSON.stringify(modelStructure)} \n`)
    // console.log(replaced, '---- replaced regex lib js')
    const destination = path.join(process.cwd(), relativeDest)

    fs.writeFileSync(destination, replaced)
}

function createModelClient(pathTemplate, arrayModelInput, modelName, relativeDest) {
    const dirJoin = path.join(__dirname, pathTemplate)
    const read = fs.readFileSync(dirJoin, 'utf8')

    //['Title', 'Description']
    console.log(arrayModelInput, typeof(arrayModelInput))
    let arrayModel = arrayModelInput.map(el => {
        return toPascalCase(el.name)
    })

    let stringState = ''
    let stringArrayFunction = []
    let stringObjectState = []

    arrayModel.map( state => {
        stringState += `const [ ${state.toLowerCase()}, set${state[0].toUpperCase()+state.slice(1, state.length)} ] = useState(null) \n`
        stringArrayFunction.push(`set${state[0].toUpperCase()+state.slice(1, state.length)}`)
        stringObjectState.push(state.toLowerCase())
    })

    stringObjectState = stringObjectState.toString()
    stringObjectState = `const stateObj = { ${stringObjectState} } \n`
    stringArrayFunction = `const funcLoop = [${ stringArrayFunction.toString() }] \n`

    let replaced = read.replace(/\/\/model-name/g, modelName)
    replaced = replaced.replace(/\/\/state/i, stringState)
    replaced = replaced.replace(/\/\/function-loop/i, stringArrayFunction)
    replaced = replaced.replace(/\/\/state-object/i, stringObjectState)
    arrayModel = arrayModel.map( el => {
        return `'${el.toString()}'`
    })
    replaced = replaced.replace(/\/\/header-table/i, `const headerTable = [${arrayModel}] \n`)

    const destination = path.join(process.cwd(), relativeDest)
    fs.writeFileSync(destination, replaced)
}

function changeClientRoute(readContent, NameModel) {
    const dirJoin = path.join(process.cwd(), readContent)
    // console.log(dirJoin)
 
    const stringTemplateComponents = 
    `import ${ toPascalCase(NameModel) } from './${toPascalCase(NameModel) }' \nimport ${ toPascalCase(NameModel) }Detail from './${toPascalCase(NameModel)}Detail'
    `

    const stringTemplateRoute = 
    `else if(linkPath === '${NameModel.toLowerCase()}') {
        return (
            <>
                <${ NameModel[0].toUpperCase()+NameModel.slice(1,NameModel.length).toLowerCase() }  />
            </>
        )
     } else if(linkPath === '${NameModel.toLowerCase()}-detail') {
        return (
            <>
                <${ NameModel[0].toUpperCase()+NameModel.slice(1,NameModel.length).toLowerCase()}Detail />
            </>
        )
     }`

    const read = fs.readFileSync(dirJoin, 'utf8')
    let replaced = read.replace(/\/\/add-new-route/i, `${stringTemplateRoute}\/\/add-new-route`)
    replaced = replaced.replace(/\/\/new-component/i, `${stringTemplateComponents}\n\/\/new-component`)
    // console.log(replaced)

    fs.writeFileSync(dirJoin, replaced)
}


function editSidebarList(pathTemplate, modelStructure) {
    const dirJoin = path.join(process.cwd(), pathTemplate)
    // console.log(dirJoin)

    const read = fs.readFileSync(dirJoin, 'utf8')
    const replaced = read.replace(/\/\*sidebar-menu\*\//i, `'${modelStructure}', \/\*sidebar-menu\*\/`)

    console.log(replaced, '-replaced')
    fs.writeFileSync(dirJoin, replaced)
}

// let controllerFile = readFile('./cms/server/controllers/example.js')

// console.log(toPascalCase('hahahahaha-yeyeyheeye'))
// //controller name
// controllerFile = controllerFile.replace(/Example/g, 'Product')

// //create new product
// controllerFile = controllerFile.replace(/newEXAMPLE/g, 'newProduct')

// //example findone
// controllerFile = controllerFile.replace(/exampleFindOne/g, 'productFindOne')

// //example findAll
// controllerFile = controllerFile.replace(/updatedEXAMPLE/g, 'updatedProduct')

// //delete 
// controllerFile = controllerFile.replace(/deletedEXAMPLE/g, 'deletedProduct')

// //filename,
// controllerFile = controllerFile.replace(/EXAMPLE/g, 'product')



// writeFile('./test-file.js', controllerFile)

module.exports = {
    createModelClient,
    createModelDetailsClient,
    changeClientRoute,
    editSidebarList,
}