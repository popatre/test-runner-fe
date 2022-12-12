const { exec } = require("child_process");
const { readFile, existsSync } = require("fs/promises");
const fs = require("fs");

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

async function runCommands(studentName, repoUrl, appType) {
    const working_dir = `${__dirname}/../../../../evaluations/${studentName}`;

    const gitClone = `git clone ${repoUrl} ${working_dir}`;
    const testRunner = `cp test-runner.js ${working_dir}`;
    const getEnv = `cp ${__dirname}/../../../../env/${appType}/.env.test ${working_dir}`;
    const setupDbs = `psql -f ${__dirname}/../../../../setup-db/${appType}/setup-test-db.sql`;
    const cdIntoDir = `cd ${working_dir}`;
    const npmInstall = `npm install`;
    const getMarkdown = `NODE_ENV=test app_type=${appType} node test-runner.js >> feedback.md`;

    await sh(
        `${gitClone} && ${testRunner} && ${getEnv} && ${setupDbs} && ${cdIntoDir} &&  ${npmInstall} && ${getMarkdown}`
    );

    const feedbackFile = await readFile(`${working_dir}/feedback.md`, "utf-8");
    await sh(`rm -r ${working_dir}`);
    return feedbackFile;
}

async function removeFolder() {
    if (fs.existsSync(`${__dirname}/../../../../evaluations`)) {
        return await sh(`rm -r ${__dirname}/../../../../evaluations`);
    } else {
        return;
    }
}

module.exports = {
    runCommands,
    removeFolder,
};
