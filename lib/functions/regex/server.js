
const fs = require('fs');
const path = require('path');
const { toPascalCase } = require('../../functions/regex/index')

function addRoutingIndex(relativePath, modelname) {
    const indexPath = path.join(process.cwd(), relativePath)
    let indexRoute = fs.readFileSync(indexPath, 'utf8')

    indexRoute = indexRoute.replace(/\/\/sulap-route-source/g, 
            `const ${modelname.toLowerCase()}Router = require('./${modelname.toLowerCase()}')\n//sulap-route-source`)

    indexRoute = indexRoute.replace(/\/\/sulap-add-route/g, 
            `router.use('/${modelname.toLowerCase()}s', ${modelname.toLowerCase()}Router) \n//sulap-add-route`)


    fs.writeFileSync(indexPath, indexRoute)
}

function addRouting(relTemplatePath, relativeDest, modelname) {
    const filePath = path.join(process.cwd(), relativeDest)
    let message;

    if(fs.existsSync(filePath)) {
        message  = 'file exists, remove or rename file first';
        console.log(message)
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')

        //do some regex
        file = file.replace(/example/, modelname)
        file = file.replace(/sulap-example-auth/, `${modelname}Auth`)    

        fs.writeFileSync(filePath, file)
        message = 'file created';
    }
    return { message };
}

function addNewModelController(relTemplatePath, relativeDest, modelname, modelStructureInput) {
    const filePath = path.join(process.cwd(), relativeDest)
    let message;
    
    if(fs.existsSync(filePath)) {
        message  = 'file exists, remove or rename file first';
        console.log(message)
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')

        modelStructureInput.forEach(el => {
            if(el.type.toLowerCase() === 'string' || el.type.toLowerCase() === 'image' || el.type.toLowerCase() === 'text') {
                file = file.replace(/\/\/sulap-add-query/, `{${el.name}: { $regex: search, $options: 'i' }}, \n//sulap-add-query`)
            } else {
                file = file.replace(/\/\/sulap-add-query/, `//sulap-add-query`)
            }
        })

        //do some regex
        file = file.replace(/Example/g, toPascalCase(modelname))
        file = file.replace(/example/g, modelname)
        file = file.replace(/EXAMPLE/g, toPascalCase(modelname))

        fs.writeFileSync(filePath, file)
        message = 'file created';
    }
    return { message };
}


function addModel(relTemplatePath, relativeDest, modelname, modelStructureInput) {
    const filePath = path.join(process.cwd(), relativeDest)
    let message;

    if(fs.existsSync(filePath)) {
        message  = 'file exists, remove or rename file first';
        console.log(message)
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')

        //model structure input
        // [ { name: 'name', type: 'string' },
        // { name: 'age', type: 'number' } ]
    

        //do some regex
        modelStructureInput.forEach(el => {
            if(el.type.toLowerCase() === 'image' || el.type.toLowerCase() === 'text') {
                el.type = 'String'
            } 

            file = file.replace(/\/\/sulap-add-models/g, `${el.name}: { type: ${toPascalCase(el.type)} }, \n \/\/sulap-add-models`)
        })

        file = file.replace(/example/g, modelname)
        file = file.replace(/Example/g, toPascalCase(modelname))


        fs.writeFileSync(filePath, file)
        message = 'file created';
    }
    return { message };
}

function addAuthorizationModel(relTemplatePath, relativeDest, modelname) {
    const filePath = path.join(process.cwd(), relativeDest)
    let message;
    
    if(fs.existsSync(filePath)) {
        message  = 'file exists, remove or rename file first';
        console.log(message)
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')

        //do some regex
        file = file.replace(/Example/g, toPascalCase(modelname))
        file = file.replace(/example/g, modelname)
        file = file.replace(/EXAMPLE/g, toPascalCase(modelname))

        fs.writeFileSync(filePath, file)
        message = 'file created';
    }
    return { message };
}

function generateDocumentation(relTemplatePath, relativeDest, modelname, modelStructureInput) {
    const templatePath = path.join(__dirname, relTemplatePath)
    const destination = path.join(process.cwd(), relativeDest)
    let message;
    
    console.log(destination, '-destination')
    if(!fs.existsSync(destination)) {
        message = 'no readme detected not exists';
        console.log(message);
    } else {
        readmeTemp = fs.readFileSync(templatePath, 'utf8')
        userReadme = fs.readFileSync(destination, 'utf8')

        //do some regex
        readmeTemp = readmeTemp.replace(/EXAMPLE_ROUTE/g, modelname.toLowerCase())
        readmeTemp = readmeTemp.replace(/EXAMPLE_CAPS/g, modelname.toUpperCase())
        readmeTemp = readmeTemp.replace(/Example/g, toPascalCase(modelname))
        readmeTemp = readmeTemp.replace(/example/g, modelname)
        readmeTemp = readmeTemp.replace(/EXAMPLE/g, toPascalCase(modelname))

        modelStructureInput.forEach( el => {
            //fill response in readme
            readmeTemp = readmeTemp.replace(/\/\/sulap-add-model/g, `\n          "${el.name}": "<${el.type}>",//sulap-add-model`)
            //fill body in readme
            readmeTemp = readmeTemp.replace(/\/\/sulap-add-body/g, `\n    - \`${el.name}\`:\`${toPascalCase(el.type)}\`//sulap-add-body`)
        })
        readmeTemp = readmeTemp.replace(/\/\/sulap-add-model/g, '')
        readmeTemp = readmeTemp.replace(/\/\/sulap-add-body/g, '')

        userReadme = userReadme.replace(/\[comment\]\: \# \(reserved for adding new model\)/, readmeTemp)
        
        fs.writeFileSync(destination, userReadme)
        message = 'readme created';
    }
    return { message };
}

module.exports = {
    addNewModelController,
    addRouting,
    addRoutingIndex,
    addModel,
    addAuthorizationModel,
    generateDocumentation
}