const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const ora = require('ora')
let spinner = ora()

function copyDirectory(relativeSource, relativeDest){
    const sourcePath = path.join(__dirname, relativeSource)
    const destiationPath = path.join(process.cwd(), relativeDest)
    return fse.copy(sourcePath, destiationPath)
}

function createFolder(folderName) {
    var dirJoin = path.join(process.cwd(), folderName);

    // console.log(dir, '-----processcwd')
    // console.log(dirJoin, '====== cwd join server')
    if (!fs.existsSync(dirJoin)){
        fs.mkdirSync(dirJoin);
    }
}

module.exports = { 
    copyDirectory,
    createFolder,
    
}
