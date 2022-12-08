const { npmIns } = require("../../runCommands");

export default async function runNpmInstall(req, res) {
    try {
        await npmIns();
        res.status(200).send({ msg: "dependencies installed" });
    } catch (error) {
        console.log(error);
    }
}
