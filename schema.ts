const mongoose = require('mongoose');
mongoose.connect(process.env.connect, { UseNewUrlParser: true });

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    description: {
        type: Array,
    }
})

export const Todo = new mongoose.model("todo", todoSchema);