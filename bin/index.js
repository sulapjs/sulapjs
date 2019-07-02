#! /usr/bin/env node

const yargs = require('yargs')
const boxen = require('boxen')
const chalk = require('yargonaut').chalk()
const figlet = require('figlet')
//commands
const jreng = require('../lib/commands/jreng')
const bikinin = require('../lib/commands/bikinin')
const komang = require('../lib/commands/executor')

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



yargs.command({
    command: 'about',
    describe: 'tentang sulapjs',
    handler: () => {
        figlet.text('SulapJs', {
            font: 'Univers',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(boxen(chalk.green(data)+`\nv.0.1\n\n                 Dibuat oleh: Michael, Doni, Komang, Rido`, { padding: 1, borderColor: 'green', borderStyle: 'round' }));
            console.log()
            // console.log(chalk.green(data));
        })
    }
})

yargs.command({
    command: 'komang',
    describe: 'MAGIC IS HERE',
    handler: (argv) => komang(argv)
})

yargs.argv