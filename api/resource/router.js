// build your `/api/resources` router here
const express = require('express');
const router = express.Router();

const Resources = require('./model')

router.get("/resources", (req, res) =>{
    Resources.getAll(req.query)
        .then(resources =>{
            res.status(200).json(resources)
        })
        .catch(err =>{
            res.status(500).json({message:"error retrieving resources"})
        })
})

router.post("/resources", (req, res) =>{
    Resources.create(req.body)
    .then(resource =>{
        res.status(201).json(resource)
    })
    .catch(err =>{
        res.status(500).json({message: "error creating resources"}) 
    })
})

module.exports = router