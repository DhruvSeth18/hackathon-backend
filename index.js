import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './connect/connection.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import shoppingRoutes from './routes/shopRoute.js';
import disasterRoute,{donation} from './routes/disasterRoute.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',disasterRoute);
app.use('/',userRoutes);
app.use('/',productRoutes);
app.use('/',shoppingRoutes);
app.use('/',donation);

const username = process.env.DB_username;
const password = process.env.DB_password;
connectDB(username,password);

const port = 8000;
app.listen(port,()=>{
    console.log("Server is working on the ",port);
})
