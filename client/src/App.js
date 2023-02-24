import './App.css';
import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { useEffect, useState } from 'react';

function App() {

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch("http://localhost:3000/todo");
    const jsonData = await response.json();
    setTodos(jsonData);
    //console.log(jsonData);
  }

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todo/${id}`, { method: 'DELETE' });
    getTodos();
  }

  const addTodo = async (description) => {
    await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description })
    });
    getTodos();
  }

  const updateTodo = async (id, description) =>{
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({description})
    });
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);


  return (
    <React.Fragment>
      <h1 className='title'> ToDo App</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} getTodos={getTodos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </React.Fragment>
  );
}

export default App;
