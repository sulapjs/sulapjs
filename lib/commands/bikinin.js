
const fs = require('fs')
const path = require('path')
const ora = require('ora');
let spinner = ora()

const { createFolder,
        copyDirectory } = require('../functions/directory.js')
const { runShellCommand } = require('../functions/shell.js')

module.exports = function bikinin(argv) {
    try {
        if (argv.model === true) {
            throw new Error('model perlu nama')
        } else if (argv.model === '') {
            throw new Error('nama model ga boleh string kosong')
        } else if (argv.attributes === true) {
            throw new Error('attributes perlu nama')
        } else if (argv.attributes === '') {
            throw new Error('attributes ga boleh string kosong')
        }

        let modelItems = argv.attributes.split(',')

        let modelObject = modelItems.map(el => {
            const [name, type] = el.split(':')

            if (name === '') {
                throw new Error('invalid name')
            }

            if (
                type.toLowerCase() !== 'string' &&
                type.toLowerCase() !== 'boolean' &&
                type.toLowerCase() !== 'number' &&
                type.toLowerCase() !== 'float'
            ) {
                throw new Error('invalid type')
            }

            // return {
            //     name,
            //     type
            // }

            readAndReplace('../models/test-model.js', `${name}: ${type}`)
        })

        console.log(modelObject)
        console.log('model dibuat')
    } catch (error) {
        console.log(error.message)
    }
}