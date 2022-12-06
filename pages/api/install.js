const { npmInstall } = require("../../runCommands");

export default async function clone(req, res) {
    try {
        const feedback = await npmInstall();
        res.status(200).send({ msg: "npm installed" });
    } catch (error) {
        console.log(error);
    }
}
