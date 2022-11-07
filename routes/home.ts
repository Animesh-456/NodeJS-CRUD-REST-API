import express, { Express, Request, Response } from 'express';
const router = express.Router();
import {Todo} from '../schema'
import {Mongoose} from 'mongoose';

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });
 router.get("/view", (req: Request, res: Response)=>{
    Todo.findOne((res: Response)=>{
        console.log(res)
    });
 })
module.exports = router;