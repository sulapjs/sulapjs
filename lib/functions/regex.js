
const fs = require('fs');
const path = require('path');

function readFile(relativePathSource) {
    //untuk baca source file di npm global --> pakai __dirname
    const pathSource = path.join(__dirname, relativePathSource)
    const read = fs.readFileSync(pathSource, 'utf8')
    return read
}

function writeFile(relativeDest, content) {
    //untuk write file di user, --> pakai process.cwd()
    const destination = path.join(process.cwd(), relativeDest)
    fs.writeFileSync(destination, content)
}

function toPascalCase(input) {// toPascalCase('hahaha-yeye') //Hahaha-Yeye
    //will turn every word in input to pascal case
    input = input.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){
            return g1.toUpperCase() + g2.toLowerCase();
        });
    return inpute
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
    toPascalCase,
    readFile,
    writeFile,
}