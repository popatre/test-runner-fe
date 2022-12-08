// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { runCommands } = require("../../runCommands");

export default async function handler(req, res) {
    try {
        const { name, repo, type } = req.query;
        console.log(name, repo, type);
        const feedback = await runCommands(name, repo, type);
        res.status(200).send({ feedback });
    } catch (error) {
        console.log(error);
    }
}
