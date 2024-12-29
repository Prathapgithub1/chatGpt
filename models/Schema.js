const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
      userName: {
        type: String,
        required: true, // Ensure the username is required
        trim: true, // Remove leading/trailing spaces,
        unique:true
      },
      // email: {
      //   type: String,
      //   // required: true, // Ensure the email is required
      //   unique: true, // Ensure the email is unique
      //   lowercase: true, // Convert email to lowercase
      //   trim: true, // Remove leading/trailing spaces
      // },
      password: {
        type: String,
        required: true, // Ensure the password is required
        unique:true
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
  );

  const UsersModel = mongoose.model('User', userSchema, 'users');

module.exports=[{
    collectionName:"users",schema:userSchema,model:UsersModel,dataBaseName:"ChatGPT"
}]