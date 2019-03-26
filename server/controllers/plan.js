import Plan from '../models/plan'
import User from '../models/user'

export const createPlan = function(req, res, next) {
  const user = req.user
  if(!user){
    return res.status(400).send({error: 'Invalid user.'})
  }

  console.log(req.body)
  console.log(req.body.title)
  const dueTime = req.body.planObj.dueTime
  const title = req.body.planObj.title

  const plan = new Plan({
    _user: user._id,
    title: title,
    dueTime: dueTime
  })

  plan.save(function(err, result){
    if(err) {
      return console.log(err)
    }
    res.send({
      status: 200,
      message: 'create plan successfully',
      data: result._id
    })
  })
}

export const getPlan = function(req, res, next) {
  const user = req.user
  if(!user) {
    return res.status(400).send({error: 'Invalid user.'})
  }

  Plan.find({_user: user._id})
    .exec(function(err, result){
      if(err){
        console.log(err)
      }
      if(result) {
        const plans = result.map((item) => {
          return {
            id: item._id,
            title: item.title,
            createdTime: item.createdTime,
            dueTime: item.dueTime,
          }
        })
        return res.json({
          planList: plans
        })
      }
    })
}

export const getPlanDetail = function(req, res, next) {
  const user = req.user
  if(!user) {
    return res.status(400).send({error: 'Invalid User.'})
  }

  const id = req.params.id
  if(!id || id.length < 0) {
    return res.status(400).send({error: 'Invalid Plan Id.'})
  }

  Plan.findOne({_id: id}, function(err, result){
    if(err) {
      console.log(err)
    }
    console.log(result)
    return res.json({
      planDetail: result
    })
  })
}
