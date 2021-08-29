// build your `Task` model here
const db = require("../../data/dbConfig")

const getAll = async () =>{
    const task = await db("tasks as t")
                            .leftJoin('projects as p', 'p.project_id', 't.project_id')
                            .select('t.*','project_name', 'project_description')
    const tasks = []

    task.forEach( task=>{
        if (task.task_completed === 0){
            tasks.push({
                project_id: task.project_id ,
                project_name: task.project_name,
                project_description: task.project_description,
                task_id: task.task_id,
                task_notes: task.task_notes,
                task_description: task.task_description,
                task_completed: false
            })
        }
        else{
            tasks.push({
                project_id: task.project_id ,
                project_name: task.project_name,
                project_description: task.project_description,
                task_id: task.task_id,
                task_notes: task.task_notes,
                task_description: task.task_description,
                task_completed: true
            })
        }
    })

    return tasks
}

const getById = async (task_id) =>{ 
    const task = await db("tasks as t")
                        .leftJoin('projects as p', 'p.project_id', 't.project_id')
                        .select('t.*','project_name', 'project_description')
                        .where('t.task_id', task_id)
                        .first()

    if (task.task_completed === 0){
        return {
                project_id: task.project_id ,
                project_name: task.project_name,
                project_description: task.project_description,
                task_id: task.task_id,
                task_notes: task.task_notes,
                task_description: task.task_description,
                task_completed: false
            }
        }
    else{
        return {
                project_id: task.project_id ,
                project_name: task.project_name,
                project_description: task.project_description,
                task_id: task.task_id,
                task_notes: task.task_notes,
                task_description: task.task_description,
                task_completed: true
            }
        }
}

const create = async (task) =>{
    const [task_id] = await db("tasks").insert(task)
    return getById(task_id)
}

module.exports = {
    getAll,
    create
}