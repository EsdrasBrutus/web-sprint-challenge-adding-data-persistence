// build your `/api/projects` router here
const express = require('express');
const router = express.Router();

const Projects = require('./model')

router.get("/projects", (req, res) =>{
    Projects.getAll(req.query)
        .then(projects =>{
            res.status(200).json(projects)
        })
        .catch(err =>{
            res.status(500).json({message:"error retrieving projects"})
        })
})

router.post("/projects", (req, res) =>{
    Projects.create(req.body)
        .then(project =>{
            res.status(201).json(project)
        })
        .catch(error =>{
            res.status(500).json({message: "error creating projects"}) 
        })
})

module.exports = router