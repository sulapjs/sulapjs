
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
    
    if(fs.existsSync(filePath)) {
        console.log(' ------- file exists, remove or rename file first')
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')

        //do some regex
        file = file.replace(/example/, modelname)
        file = file.replace(/sulap-example-auth/, `${modelname}Auth`)    

        fs.writeFileSync(filePath, file)
    }

}

function addNewModelController(relTemplatePath, relativeDest, modelname, modelStructureInput) {
    const filePath = path.join(process.cwd(), relativeDest)
    
    if(fs.existsSync(filePath)) {
        console.log(' ------- file exists, remove or rename file first')
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')

        

        modelStructureInput.forEach(el => {
            if(el.type.toLowerCase() === 'string') {
                file = file.replace(/\/\/sulap-add-query/, `{${el.name}: { $regex: search, $options: 'i' }}, \n//sulap-add-query`)
            }
        })
        

        //do some regex
        file = file.replace(/Example/g, toPascalCase(modelname))
        file = file.replace(/example/g, modelname)
        file = file.replace(/EXAMPLE/g, toPascalCase(modelname))

        fs.writeFileSync(filePath, file)
    }
}


function addModel(relTemplatePath, relativeDest, modelname, modelStructureInput) {
    const filePath = path.join(process.cwd(), relativeDest)


    if(fs.existsSync(filePath)) {
        console.log(' ------- file exists, remove or rename file first')
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
    }
}

function addAuthorizationModel(relTemplatePath, relativeDest, modelname) {
    const filePath = path.join(process.cwd(), relativeDest)
    
    if(fs.existsSync(filePath)) {
        console.log(' ------- file exists, remove or rename file first')
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')

        //do some regex
        file = file.replace(/Example/g, toPascalCase(modelname))
        file = file.replace(/example/g, modelname)
        file = file.replace(/EXAMPLE/g, toPascalCase(modelname))

        fs.writeFileSync(filePath, file)
    }
}

module.exports = {
    addNewModelController,
    addRouting,
    addRoutingIndex,
    addModel,
    addAuthorizationModel,
}