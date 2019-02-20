// const express = require("express");
// const router = express.Router();
// const knex = require('knex');

// const knexConfig = {
//     client: "sqlite3",
//     connection: {
//         filename: "../data/lambda.sqlite3"
//     },
//     useNullAsDefault: true,
// }
// const cohortsDB = knex(knexConfig)

// router.get("/", async (req, res) => {
//     try {
//         const cohorts = await cohortsDB("cohorts")
//         res.status(200).json(cohorts);
//     } catch (error) {
//         res.status(500).json({error: "Couldn't fetch cohorts"})
//     }
// })

// module.exports = router;