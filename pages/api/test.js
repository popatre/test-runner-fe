// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { runCommands } = require("../../runCommands");

export default async function handler(req, res) {
    try {
        const feedback = await runCommands();
        res.status(200).send({ feedback });
    } catch (error) {
        console.log(error);
    }
}
