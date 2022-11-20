//Declaring variables
const express = require('express')
const app = express()
const PORT = 8000;
const mongoose = require('mongoose');
require('dotenv').config()
const TodoTask = require('./models/todotask')


//Set Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewURLParser: true},
    () => {console.log(`Connected to Database!`)}
)

//Get Method
app.get('/', async (req, res) => {
    try{
        TodoTask.find({}, (err, tasks) => {
            res.render('index.ejs', {
                ToDoTasks: tasks
            })
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

//Post Method
app.post('/', async (req,res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try {
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    } catch(err) {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})

app.listen(PORT, () => console.log(`Server is runnin on port ${PORT}`))

