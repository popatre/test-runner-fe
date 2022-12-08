const { exec } = require("child_process");
const { readFile, existsSync } = require("fs/promises");

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
    const working_dir = `./evaluations/${studentName}`;

    const gitClone = `git clone ${repoUrl} ${working_dir}`;
    const testRunner = `cp test-runner.js ${working_dir}`;
    const getEnv = `cp ./env/${appType}/.env.test ${working_dir}`;
    const setupDbs = `psql -f ./setup-db/${appType}/setup-test-db.sql`;
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

/********** Split up functions to get around timeout ********/

// async function cloneRepo() {
//     console.log("cloning repo");
//     const { stdout } = await sh(
//         `${gitClone} && ${testRunner} && ${getEnv} && ${setupDbs}`
//     );
// }

// async function npmIns() {
//     console.log("npm installing");
//     const { stdout } = await sh(`${cdIntoDir} && ${npmInstall}`);
// }

// async function removeFolder() {
//     await sh(`rm -r ${working_dir}`);
// }

module.exports = {
    runCommands,
};
