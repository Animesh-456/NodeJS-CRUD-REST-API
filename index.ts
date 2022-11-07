import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { time } from 'console';
import { Todo } from './schema';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;


const homeRoute = require('./routes/home');
const addRoute = require('./routes/add');

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(homeRoute)
app.use(addRoute)

app.listen(port, () => {
  console.log(`[server]: Server is running at localhost:${port}`);
});