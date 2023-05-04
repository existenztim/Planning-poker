import { Schema, model } from 'mongoose';


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,  
      //När användare skapas så får de värdet på admin som false. 
      //Vi skickar in admin-loggin genom backend med värdet true när denne skapas. 
    }
  }
);


//module.exports = mongoose.model('user', UserSchema)

const User = model('users', userSchema);
export default User;
