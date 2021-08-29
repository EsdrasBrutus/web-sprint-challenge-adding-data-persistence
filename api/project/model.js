// build your `Project` model here
const db = require("../../data/dbConfig")

const getAll = async () =>{
    const project = await db("projects")
    const projects = []

    project.forEach( proj=>{
        if (proj.project_completed === 0){
            projects.push({
                project_id: proj.project_id ,
                project_name: proj.project_name,
                project_description:proj.project_description,
                project_completed: false
            })
        }
        else{
            projects.push({
                project_id: proj.project_id ,
                project_name: proj.project_name,
                project_description:proj.project_description,
                project_completed: true
            })
        }
    })

    return projects
}

const getById = (project_id) =>{
    return db("projects").where("project_id", project_id).first()
}

const create = async (project) =>{
    const [project_id] = await db("projects").insert(project)
    return getById(project_id)
}

module.exports = {
    getAll,
    create
}