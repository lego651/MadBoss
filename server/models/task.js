import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TaskSchema = new Schema({
    _user: { type: ObjectId, ref: 'User' },
    addedTime: { type: Date, default: Date.now },
    ifDone: { type: Boolean, default: false },
    content: { type: String, default: '' }
});

export default mongoose.model('Task', TaskSchema, 'tasks');
