const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const pool = require('./db/db.js');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


//create todo:
app.post('/todo', async (req, res, next) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.json(newTodo.rows);
        //console.log(newTodo.rows);
        next();

    } catch (e) {
        const error = new Error('Cannot add todo: ' + e.message);
        error.status = 400;
        next(error);
    }

});

//update todo:
app.put("/todo/:id", async (req, res, next) => {
    try {
        const t_id = req.params.id;
        const { description } = req.body;
        const updatedTodo = await pool.query('UPDATE todo SET description = $1 WHERE t_id = $2 RETURNING *', [description, t_id]);
        res.json(updatedTodo.rows);
        next();

    } catch (e) {
        const error = new Error('Cannot update todo: ' + e.message);
        error.status = 400;
        next(error);
    }
});

//get todo:
app.get('/todo/:id', async (req, res, next) => {
    try {
        const t_id = req.params.id;
        const todo = await pool.query('SELECT * FROM todo WHERE t_id = $1', [t_id]);
        res.json(todo.rows);
        next();
    } catch (e) {
        const error = new Error('Can not find todo: ' + e.message);
        error.status = 404;
        next(error);
    }
});

//get all todos:
app.get('/todo', async (req, res, next) => {
    try {
        const todos = await pool.query('SELECT * FROM todo ORDER BY t_id');
        res.json(todos.rows);
        next();
    } catch (e) {
        const error = new Error('Can not find todos: ' + e.message);
        error.status = 404;
        next(error);
    }
});

//delete todo:
app.delete('/todo/:id', async (req, res, next) => {
    try {
        const t_id = req.params.id;
        await pool.query('DELETE FROM todo WHERE t_id = $1 RETURNING *', [t_id]); 
        const newTodos = await pool.query('SELECT * FROM todo ORDER BY t_id');
        res.json(newTodos.rows);
    } catch (e) {
        const error = new Error('Cannot delete todo: ' + e.message);
        error.status = 400;
        next(error);
    }

});



app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
    }
    res.status(err.status).send(err.message);
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})

//const newTodo = pool.query('INSERT INTO todo(description) VALUES ($1)', ['my second todo']);