const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

// const cohortsRouter = require("./routers/cohortsRouter");
// const studentsRouter = require("./routers/studentsRouter")

const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: "./data/lambda.sqlite3"
    },
    useNullAsDefault: true,
}
const db = knex(knexConfig)

const server = express()

server.use(express.json());
server.use(helmet());
// server.use("/api/cohorts", cohortsRouter);
// server.use("/api/students", studentsRouter);

server.get("/api/cohorts", async (req, res) => {
    try {
        const cohorts = await db("cohorts")
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json({error: "Couldn't fetch cohorts"})
    }
})

server.get("/api/cohorts/:id", async (req, res) => {
    try {
        const cohort = await db('cohorts')
          .where({id: req.params.id})
          .first();
          if (!cohort) {
            res.status(404).json({error: "cohort with that ID could not be found"})
          } else {
            res.status(200).json(cohort);
          }
      } catch (error) {
        res.status(500).json(error)
      }
  })

server.get("/api/cohorts/:id/students", async (req, res) => {
    try {
        const students = await db('students')
          .where({cohort_id: req.params.id})
        if (!students) {
        res.status(404).json({error: "No students were found!"})
        } else {
        res.status(200).json(students);
        }
    } catch (error) {
    res.status(500).json(error)
    }
})

server.post("/api/cohorts", async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({error: 'please enter a name!'})
      }
    try {
    const [id] = await db('cohorts').insert(req.body);
    const cohort = await db('cohorts')
        .where({ id })
        .first();
    res.status(201).json({cohort})
    } catch (error) {
    res.status(500).json(error)
    }
})

server.put("/api/cohorts/:id", async (req, res) => {
    if (!req.body.name) {
        res.status(400).json({error: 'please enter a name!'})
    }
    try {
      const count = await db("cohorts")
        .where({ id: req.params.id})
        .update(req.body)
  
        if (count > 0) {
            const cohort = await db('cohorts')
            .where({id: req.params.id})
            .first();
    
            res.status(200).json(cohort)
        } else {
            res.status(404).json({error: "cohort not found"})
        }
    } catch (error) {
      res.status(500).json(error)
    }
})

server.delete("/api/cohorts/:id", async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id})
        .del();
        if (count > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({ error: "cohort not found"})
        }
    } catch (error) {
      res.status(500).json(error)
    }
})

//Students: 
server.get("/api/students", async (req, res) => {
    try {
        const students = await db("students")
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: "Couldn't fetch students"})
    }
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n*** Server Running on Port ${port} ***\n`)
})