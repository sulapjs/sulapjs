#! /usr/bin/env node

console.log('dari server')
const argv = require('yargs').argv

console.log(argv)

if(argv._[0] === 'jreng') {
    console.log('create nih')
    if(argv._[1] === undefined) {
        //kalau namanya tidak ada
        console.log("input nama dongz")
    } else {
        //input function later
        console.log('namanya ini yaaa --> ', argv._[1])
    }
} else if(argv._[0] === 'server') {
    console.log('server nih')
} else {
    console.log('masuk else')
}