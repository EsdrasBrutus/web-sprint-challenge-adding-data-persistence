// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();

const Tasks = require('./model')

router.get("/tasks", (req, res) =>{
    Tasks.getAll(req.query)
    .then(tasks =>{
        res.status(200).json(tasks)
    })
    .catch(err =>{
        res.status(500).json({message:"error retrieving tasks"})
    })
})

router.post("/tasks", (req, res) =>{
    Tasks.create(req.body)
    .then(task =>{
        res.status(201).json(task)
    })
    .catch(err =>{
        res.status(500).json({message: "error creating tasks"}) 
    })
})

module.exports = router