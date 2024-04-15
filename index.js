import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './connect/connection.js';
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

const username = process.env.DB_username;
const password = process.env.DB_password;
connectDB(username,password);

const port = 8000;
app.listen(port,()=>{
    console.log("Server is working on the ")
})
