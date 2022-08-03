import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userForm from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 5000

///Middlerware

app.use(cors());
app.use(express.json());

//Route

app.use('/api/userdata', userForm);

/// Connect DB

mongoose.connect(
    `mongodb+srv://brijesh:brijesh@cluster0.qe9bgqk.mongodb.net/eCommerse?retryWrites=true&w=majority`
).then(()=>{
   
    console.log("Database Succesfull Connect with 5000");
}).catch((err)=>{
    console.log(err)
})

//// Create Server

app.listen(port, ()=>{
    console.log(`Server Running On Port ${5000}`)
})