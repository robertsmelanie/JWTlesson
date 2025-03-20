const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema
({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        reequired: [true, "Please enter a password"],
        minlength: [6, 'Minimum length is 6 characters']
    }

})



userSchema.pre('save', async function(next){
    const saltRounds = 10; //this was later from JWT video 6 
    if (this.isModified('password0')){
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            this.password = await bcrypt.hash(this.password, salt)
            next();
        }
        catch (error) {
            console.error('Error hashing password: ', error);
            next(error);
        }
    } else {
        next();
    }
});
   
  

const User = mongoose.model('user', userSchema);

module.exports = User;