// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { runCommands } = require("../../runCommands");

export default async function handler(req, res) {
    try {
        const { name, repo, type } = req.query;
        const feedback = await runCommands(name, repo, type);
        res.status(200).send({ feedback });
    } catch (error) {
        // Doesn't seem to end up in the catch with an error status
        res.status(200).send({
            status: 400,
            msg: "Bad request - please return to the previous page and try again",
            isError: true,
        });
    }
}
