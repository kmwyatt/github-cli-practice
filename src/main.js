// @ts-check

require('dotenv').config();

const { GITHUB_ACCESS_TOKEN } = process.env;
console.log('Token:', GITHUB_ACCESS_TOKEN);

const { program } = require('commander');

program.version('0.0.1');

program
    .command('list-bugs')
    .description('List issues with bug label')
    .action(async () => {
        console.log('List bugs!');
    });

program
    .command('check-prs')
    .description('Check pull request status')
    .action(async () => {
        console.log('Check PRs!');
    });

program.parseAsync();
