import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  
  
},
{
  timeStamps: true
}
);




const User = mongoose.model('User',userSchema)
export default User