
import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Basic User Schema for Google Authentication
const UserSchema = new Schema({
    email: {type: String,
            required: [true, 'email required'],
            unique: [true, 'email already registered'],
            lowercase: true},
    googleId: {type: String,
               default: null},
    username: {type:String,
                default: ''}
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('User', UserSchema)
