import mongoose,{Schema}  from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        allowNull: false,
        unique: true,
      },
      password: {
        type: String,
        allowNull: false,
      }
})

export const Users = mongoose.model('Users',userSchema)