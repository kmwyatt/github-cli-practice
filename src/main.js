// @ts-check

require('dotenv').config();

const { GITHUB_ACCESS_TOKEN } = process.env;

const { program } = require('commander');
const { Octokit } = require('octokit');

program.version('0.0.1');

const octokit = new Octokit({ auth: GITHUB_ACCESS_TOKEN });

program
    .command('me')
    .description('Check my profile')
    .action(async () => {
        const {
            data: { login },
        } = await octokit.rest.users.getAuthenticated();
        console.log('Hello, %s', login);
    });

program
    .command('list-bugs')
    .description('List issues with bug label')
    .action(async () => {
        const result = await octokit.rest.issues.listForRepo({
            owner: 'kmwyatt',
            repo: 'github-cli-practice',
        });

        // console.log(result);

        // result.data.forEach((issue) => {
        //     console.log(issue.number, issue.labels);
        // });

        const issuesWithBugLabel = result.data.filter(
            (issue) =>
                issue.labels.find((label) => label.name === 'bug') !==
                undefined,
        );

        const output = issuesWithBugLabel.map((issue) => ({
            title: issue.title,
            number: issue.number,
        }));

        console.log(output);
    });

program
    .command('check-prs')
    .description('Check pull request status')
    .action(async () => {
        console.log('Check PRs!');
    });

program.parseAsync();
