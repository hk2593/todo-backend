const express=require('express');
const app=express();
require("dotenv").config();
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
const authRoutes=require('./routes/authRoutes');
const todoRoutes=require('./routes/todoRoutes');
const cors=require("cors");

app.use(
    cors({
      credentials: true,
      origin: "https://todo-frontend-henna-nu.vercel.app"
    
    })
  );
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
mongoose.connect('mongodb+srv://sunilkumar47260:onamiWU1JUN9SZny@cluster0.giviwl5.mongodb.net/todo_database');

app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);

app.listen(4000,()=>{
    console.log("server started at port 4000");
}) 