import express, { Express, Request, Response } from 'express';
const router = express.Router();
import { Todo } from '../schema'
import bodyParser from "body-parser";
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
router.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
router.get("/users", (req: Request, res: Response) => {

    Todo.find((err: any, users: any) => {
        if (!err) {
            res.json({
                users
            })
        }
    })
})

router.get("/todo/:id", (req: Request, res: Response) => {
    Todo.find({ email: req.params.id }, (err: any, docs: any) => {

        if (!err) {
            res.json(docs)
        }
    })
})

router.post("/adduser", (req: Request, res: Response) => {


    let instance = new Todo({
        name: req.body.name,
        email: req.body.email
    })

    instance.save((err: any) => {
        if (!err) {
            res.send(200)
        } else {
            res.send(404);
            console.log(req.body)
        }
    })

})

router.post("/adddesc", (req: Request, res: Response) => {
    const email = req.body.email
    const description = req.body.description

    Todo.updateOne({ email: email }, { $push: { description: description } }, (err: any) => {
        if (!err) {
            res.sendStatus(200)
        } else {
            res.sendStatus(402)
        }
    })
})

router.delete("/todo/:id", (req: Request, res: Response) => {
    //console.log(req.params.id)
    const email = req.params.id
    Todo.updateOne({ email: email }, { $pop: { description: 1 } }, (err: any) => {
        if (!err) {
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    })
})


module.exports = router;