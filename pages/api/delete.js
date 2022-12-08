const { removeFolder } = require("../../runCommands");

export default async function clone(req, res) {
    try {
        await removeFolder();
        res.status(200).send({ msg: "folder removed" });
    } catch (error) {
        console.log(error);
    }
}
