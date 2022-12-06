const { exec } = require("child_process");
const { readFile } = require("fs/promises");

const repoUrl = "https://github.com/popatre/nc_news.git";
const studentName = "Jonathan";
const appType = "news";
const working_dir = `./evaluations/${studentName}`;

async function sh(cmd) {
    return new Promise(function (resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                console.log(cmd);
                resolve({ stdout, stderr });
            }
        });
    });
}

const gitClone = `git clone ${repoUrl} ${working_dir}`;
const testRunner = `cp test-runner.js ${working_dir}`;
const getEnv = `cp ./env/${appType}/.env.test ${working_dir}`;
const setupDbs = `psql -f ./setup-db/${appType}/setup-test-db.sql`;
const cdIntoDir = `cd ${working_dir}`;
const npmInstall = `npm install`;
const getMarkdown = `NODE_ENV=test app_type=${appType} node test-runner.js >> feedback.md`;

async function cloneRepo() {
    console.log("cloning repo");
    const { stdout } = await sh(
        `${gitClone} && ${testRunner} && ${getEnv} && ${setupDbs}`
    );
}

async function npmIns() {
    console.log("npm installing");
    const { stdout } = await sh(`${cdIntoDir} && ${npmInstall}`);
}

async function main() {
    const { stdout } = await sh(`${cdIntoDir} && ${getMarkdown}`);

    const feedbackFile = await readFile(`${working_dir}/feedback.md`, "utf-8");
    await sh(`rm -r evaluations`);
    return feedbackFile;
}

module.exports = { runCommands: main, cloneRepo, npmInstall: npmIns };
