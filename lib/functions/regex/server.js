
const fs = require('fs');
const path = require('path');

function addRoutingIndex(relativePath, modelname) {
    const indexPath = path.join(process.cwd(), relativePath)
    console.log('ari')
    let indexRoute = fs.readFileSync(indexPath, 'utf8')

    indexRoute = indexRoute.replace(/\/\/sulap-route-source/g, 
            `const ${modelname}Router = require('./${modelname}')\n//sulap-route-source`)

    indexRoute = indexRoute.replace(/\/\/sulap-add-route/g, 
            `router.use('/${modelname}', ${modelname}Router) \n//sulap-add-route`)

    fs.writeFileSync(indexPath, indexRoute)
}

function addRouting(relTemplatePath, relativeDest, modelname) {
    const filePath = path.join(process.cwd(), relativeDest)
    
    if(fs.existsSync(filePath)) {
        console.log(' ------- file exists, remove or rename file first')
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')
        console.log(file)

        //do some regex

        fs.writeFileSync(filePath, file)
    }

}

function addNewModelController(relTemplatePath, relativeDest, modelname) {
    const filePath = path.join(process.cwd(), relativeDest)
    
    if(fs.existsSync(filePath)) {
        console.log(' ------- file exists, remove or rename file first')
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')
        console.log(file)

        //do some regex

        fs.writeFileSync(filePath, file)
    }
}


function addModel(relTemplatePath, relativeDest, modelname) {
    const filePath = path.join(process.cwd(), relativeDest)


    if(fs.existsSync(filePath)) {
        console.log(' ------- file exists, remove or rename file first')
    } else {
        const templatePath = path.join(__dirname, relTemplatePath)
        let file = fs.readFileSync(templatePath, 'utf8')
        console.log(file)

        //do some regex

        fs.writeFileSync(filePath, file)
    }
}

module.exports = {
    addNewModelController,
    addRouting,
    addRoutingIndex,
    addModel,
}