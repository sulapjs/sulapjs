function toPascalCase(input) {// toPascalCase('hahaha-yeye') //Hahaha-Yeye
    //will turn every word in input to pascal case
    input = input.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){
            return g1.toUpperCase() + g2.toLowerCase();
        });
    return input
}

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


module.exports = {
    toPascalCase,
    readFile,
    writeFile,
}