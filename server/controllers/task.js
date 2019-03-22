import Task from '../models/task'
import User from '../models/user'

export const addTask = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.status(400).send({error: 'invalid user.'})
  }

  const content = req.body.content
  const task = new Task({
      _user: user._id,
      content: content
  })

  task.save(function(err, result) {
    if(err) {
      return console.log(err)
    }
    // return res.json({'task': 'added'})
    return res.json({
      'content': content,
      'id': result._id
    })
  })
}

// POST delete task
export const deleteTask = function(req, res, next) {
  const task_id = req.body.task_id
  if(!task_id || task_id.length < 0) {
    return res.status(400).send({error: 'invalid task.'})
  }

  Task.remove({_id: task_id}, function(err) {
    if(err) {
      console.log(err)
    }
    return res.json({"task": "removed"})
  })
}

// Search Task List
export const searchTask = function(req, res, next) {
  const user = req.user

  if(!user) {
    return res.status(400).send({error: 'invalid user.'})
  }

  Task.find({_user: user._id})
      .exec(function(err, results){
        if(err) {
          console.log(err)
        }
        if(results) {
          const tasks = results.map((item) => {
            return {
              content: item.content,
              id: item._id
            }
          })
          return res.json({
            'tasksList': tasks
          })
        }
      }) // -- Task.find.exec --
}
