const express = require('express'); //framework
const {User,Post}=require("./models/schemas"); // data validation or "blueprient for data to be"
const fileUpload = require('express-fileupload')//imported because have to upload files
const path = require('path');
// const bodyparser = require('body-parser')
const cors = require("cors") //cross origin resource sharing
const mongoose = require('mongoose');   // DBMS with schemas support
const port = 8080 || process.env.PORT  // if 8080 is busy then process give us a port
//url server database url
const url = "mongodb+srv://prathmesh:prathmesh@cluster0.jdolkoc.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);
const app = express(); //creating instant of express class.
app.use(express.urlencoded());
app.use(express.json()) //middleware to parsing json data format
app.use(cors());
app.use(fileUpload());
// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json())
//connect to server database
mongoose.connect(url,(err)=>{
    if(err){console.log(err);}else{
        console.log("connected to database");
    }
})

app.get('/',(req,res)=>{
    res.send(`server is up at ${port}`)
})

// app.post('/api/registration',async(req,res)=>{
//      const userName = req.body.username
//     console.log(userName);
//     const post = new Post({
//        Username:userName
//     })
//     try{    
//         const response = await post.save();
//         // console.log(response);
        
//         res.json({message:"everything is okk",response})
//     }catch(e){
//         res.json({message:"something went wrong",response:e})
//     }
// })

app.post('/api',(req,res)=>{
  
    const { username, address, description ,like,date}  = req.body
    // console.log({ username, address, description,like,date })
 
 const {image_file} = req.files;
//  
// console.log(image_file);
 image_file.mv("./upload/"+image_file.name,async(err)=>{
if(err){
   
    res.json({message:err})}
    else{
        const post = new Post({
            ...{ username, address, description,like,date },
          image_file:  image_file.name
        })

        try{
            const response = await post.save();
            res.json({message:"evrything is ok", response});
        }catch(e){
            res.json({message:"something went wrong",response:e})
        }
       
    }

 })

})

app.get('/api/all',async(req,res)=>{
  //  console.log(await post.find());
    res.json({result:await Post.find()})
})

app.get("/images/:fileName", async (req, resp) => {
    // console.log(`./upload/${req.params.fileName}`)
    resp.sendFile(path.join(__dirname, `./upload/${req.params.fileName}`))
})
app.listen(port,()=>{console.log(`server is up at ${port}`);})
