
const fs = require('fs');
const path = require('path');
const { toPascalCase } = require('../../functions/regex/index')


function editDashboardHome( readContent, NameModel, pathModelFile ){
    const dirJoin = path.join(process.cwd(), readContent)
    const destination = path.join(process.cwd(), pathModelFile)
    let message;

    if(fs.existsSync(destination)){
        message = 'file already exist';
        console.log(message);
    } else {
        const  stringFunctionComponents = `axios.get('/${NameModel.toLowerCase()}s', { headers: { token: localStorage.getItem('token')}}), /*add-axios-function*/`


        const read = fs.readFileSync(dirJoin, 'utf8')
        let replaced = read.replace(/\/\*add-axios-function\*\//i, stringFunctionComponents)
        // console.log(replaced)
    
        fs.writeFileSync(dirJoin, replaced)
        message = 'created';
    }
    return { message };
}

function changeClientRoute(readContent, NameModel, pathModelFile) {
    const dirJoin = path.join(process.cwd(), readContent)
    const destination = path.join(process.cwd(), pathModelFile)
    let message;
    
    if(fs.existsSync(destination)){
        message = 'file already exist';
        console.log(message);
    } else {
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
        message = 'created';
    }
    return { message };
}

function editSidebarList(pathTemplate, modelStructure, pathModelFile) {
    const dirJoin = path.join(process.cwd(), pathTemplate)
    const destination = path.join(process.cwd(), pathModelFile)
    let message;
    // console.log(dirJoin)

    if(fs.existsSync(destination)){
        message = 'file already exist';
        console.log(message);
    } else {
        const read = fs.readFileSync(dirJoin, 'utf8')
        const replaced = read.replace(/\/\*sidebar-menu\*\//i, `'${modelStructure}', \/\*sidebar-menu\*\/`)

        //console.log(replaced, '-replaced')
        fs.writeFileSync(dirJoin, replaced)
        message = 'created';
    }
    return { message };
}

function createModelDetailsClient(pathTemplate, modelStructureInput, modelName, relativeDest) {
    const dirJoin = path.join(__dirname, pathTemplate)
    // console.log(dirJoin)
    //{ Title:'String', Description:'String'},
    const destination = path.join(process.cwd(), relativeDest)
    let message;

    if(fs.existsSync(destination)){
        message = 'file already exist';
        console.log(message);
    } else {
        let modelStructure = {}
        modelStructureInput.forEach( el => {
            modelStructure[toPascalCase(el.name)] = toPascalCase(el.type)
        })
    
        const read = fs.readFileSync(dirJoin, 'utf8')
        let replaced = read.replace(/\/\/model-info/i, `const modelInfo = ${JSON.stringify(modelStructure)} \n`)
        replaced = replaced.replace(/\/\/model-name/gi, toPascalCase(modelName))
        // console.log(replaced, '---- replaced regex lib js')
        
    
        fs.writeFileSync(destination, replaced)
        message = 'created';
    }
    return { message };
}

function createModelClient(pathTemplate, modelInput, modelName, relativeDest) {
    const dirJoin = path.join(__dirname, pathTemplate)
    const read = fs.readFileSync(dirJoin, 'utf8')
    const destination = path.join(process.cwd(), relativeDest)
    let message;

    if(fs.existsSync(destination)){
        message = 'file already exist';
        console.log(message);
    } else {

        let stringState = ''
        let stringArrayFunction = []
        let stringObjectState = []
        let stateName = {}

        modelInput.map(state => {
            if(state.type === 'boolean'){
                stringState += `const [ ${state.name.toLowerCase()}, set${toPascalCase(state.name)}] = useState(false) \n    `
            } else if( state.type === 'number' || state.type === 'float' ) {
                stringState += `const [ ${state.name.toLowerCase()}, set${toPascalCase(state.name)}] = useState(0) \n    `
            } 
            else {
                stringState += `const [ ${state.name.toLowerCase()}, set${toPascalCase(state.name)}] = useState('') \n    `
            }
            stringArrayFunction.push(`set${ toPascalCase(state.name) }`)
            stringObjectState.push(state.name.toLowerCase())
            stateName[state.name.toLowerCase()] = `${state.type}`
        })

        stringObjectState = stringObjectState.toString()
        stringObjectState = `const stateObj = { ${stringObjectState} } \n`
        stringArrayFunction = `const funcLoop = [${ stringArrayFunction.toString() }] \n`

        let replaced = read.replace(/\/\/model-name/g,  toPascalCase(modelName))
        replaced = replaced.replace(/\/\/state-name/g, `const stateType =${JSON.stringify(stateName)}`)
        replaced = replaced.replace(/\/\/state/i, stringState)
        replaced = replaced.replace(/\/\/model-lower-case/gi, modelName.toLowerCase())
        replaced = replaced.replace(/\/\/function-loop/i, stringArrayFunction)
        replaced = replaced.replace(/\/\/state-object/i, stringObjectState)
        
        //console.log(replaced)
        
        fs.writeFileSync(destination, replaced)
        message = 'created';
    }
    return { message };
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
    editDashboardHome
}