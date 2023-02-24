import './AddTodo.css';
import React from 'react';
import {useState} from 'react';

function AddTodo(props) {

    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
       e.preventDefault();
       props.addTodo(input);
       setInput('');
    }

    const handleChange = (e) => {
       setInput(e.target.value);
    }

    return (
        <React.Fragment>
           <form className='add-todo-form'>  
             <input type="text" value={input} onChange={handleChange} className='todo-desc-input'/>
             <button className='add-button' type="submit" onClick={handleSubmit}>Add</button>  
           </form>
        </React.Fragment>
    );

}

export default AddTodo;