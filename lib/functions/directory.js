const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const ora = require('ora')
let spinner = ora()

function copyDirectory(relativeSource, relativeDest){
    const sourcePath = path.join(__dirname, relativeSource)
    const destiationPath = path.join(process.cwd(), relativeDest)
    return fse.copySync(sourcePath, destiationPath)
}

function createFolder(folderName) {
    var dirJoin = path.join(process.cwd(), folderName);
    var message;
    // console.log(dir, '-----processcwd')
    // console.log(dirJoin, '====== cwd join server')
    if (!fs.existsSync(dirJoin)){
        fs.mkdirSync(dirJoin);
        message = 'folder created';
    } else {
        message = 'folder already exists';
    }
    return ({ message, dirJoin });
}

function cwdPath(relativePath) {
    const gpath = path.join(process.cwd(), relativePath)
    return gpath
}

function dirPath(relativePath) {
    const dpath = path.join(__dirname, relativePath)
    return dpath
}

module.exports = { 
    copyDirectory,
    createFolder,
    dirPath,
    cwdPath,
}
