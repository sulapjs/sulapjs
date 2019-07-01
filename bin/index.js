#! /usr/bin/env node

const yargs = require('yargs')

//commands
const jreng = require('../lib/commands/jreng')
const bikinin = require('../lib/commands/bikinin')

require('yargonaut')
    .style('blue')
    .style('yellow', 'required')
    .helpStyle('green')
    .errorsStyle('red')
yargs.version('0.1')


//jreng
yargs.command({
    command: 'jreng',
    describe: 'buat server dan client',
    type: String,
    handler: (argv) => jreng(argv)
})

//bikinin
yargs.command({
    command: 'bikinin',
    describe: 'bikinin model dll',
    builder: {
        model: {
            type: 'string',
            demandOption: true,
            alias: 'm'
        },
        attributes: {
            type: 'string',
            demandOption: true,
            alias: 'a'
        }
    },
    handler: argv => bikinin(argv)
})


yargs.argv