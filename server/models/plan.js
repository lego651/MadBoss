import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PlanSchema = new Schema({
  _user: { type: ObjectId, ref: 'User' },
  createdTime: { type: Date, default: Date.now },
  title: { type: String, default: '' },
  dueTime: { type: Date },
  learned: { type: String, default: ''}
})

export default mongoose.model('Plan', PlanSchema, 'plans')
