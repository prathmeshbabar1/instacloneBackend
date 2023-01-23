const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        default:"preeti"
    },
    password:{
        type:String,
        require:true,
        default:"gxhdjthd"
    }
})
const PostSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        default:"name1"
    },
    address:{
        type:String,
        // require:true,
        default: 'Hyderabad'
    },
    image_file: {
        type: String ,
        // require: true 
    },
    description: {
        type: String ,
        // require: true 
    },
    like:{
type:String
    },
    date:{
        type:String
            }

})

module.exports = {User: mongoose.model("InstaUser", UserSchema),
                  Post:mongoose.model("InstaPost", PostSchema) }