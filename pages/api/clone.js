const { cloneRepo } = require("../../runCommands");

export default async function clone(req, res) {
    try {
        await cloneRepo();
        res.status(200).send({ msg: "repoCloned" });
    } catch (error) {
        console.log(error);
    }
}
