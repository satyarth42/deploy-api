require('dotenv').config()
const express = require('express')
const parser = require('body-parser')
const mongoose = require('mongoose');
const router = express.Router()

const app = express()
const port = 3001

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

mongoose.connect(process.env.DB_PATH,{useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true },function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("DB connected");
    }
});

app.use('/',router)

const userSchema = require('./models/userModel')

router.post('/api/add',(req,res)=>{
    const name = req.body.name
    const newUser = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        name: name
    })

    newUser.save((err,doc) => {
        if(err){
            res.json(err).status(400)
        }
        else{
            res.json({msg:"User registered"}).status(201)
        }
    })

})

router.get('/api/fetch',(req,res)=>{
    userSchema.find()
    .exec()
    .then(docs=>{
        res.send(docs).status(200)
    })
    .catch(err=>{
        res.send(err).status()
    })
})

app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})