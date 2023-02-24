import React, {useEffect, useState} from 'react';
import './Todo.css'


function Todo(props) {

    const [editWindowVisibility, setEditWindowVisibility] = useState('invisible edit-window');
    const [newDescription, setDewDescription] = useState('');

    const handleDeleteTodo = (e) => {
        props.deleteTodo(props.todo.t_id);
    }

    const handleEditTodo = (e) => {
        setEditWindowVisibility('visible edit-window');
    }

    const handleSaveNewDesc = (e) =>{
        e.preventDefault();
        props.updateTodo(props.todo.t_id, newDescription);
        setEditWindowVisibility('invisible edit-window');
    }

    const handleExitEdit = (e) =>{
        setEditWindowVisibility('invisible edit-window');
    }

    const handleDescriptionChange = (e) => {
        setDewDescription(e.target.value);
    }

    useEffect(()=>{
        setDewDescription(props.todo.description);
    }, [])

    return (
        <React.Fragment>
            <td className='description'>
                {props.todo.description}
            </td>
            <td className='controls'>
                <div className='separator'></div>
                <button className='edit-btn' value={props.todo.t_id} onClick={handleEditTodo}>Edit</button>
                <button className='delete-btn' value={props.todo.t_id} onClick={handleDeleteTodo}>Delete</button>

            </td>
            <td className={editWindowVisibility}>
                <form >
                    <input className='new-description' value={newDescription} onChange={handleDescriptionChange}/>
                    <button className='save-btn' type="submit" onClick={handleSaveNewDesc}>Save</button>
                    <button className='exit-btn' type='button' onClick={handleExitEdit}>Exit</button>
                </form>
            </td>
        </React.Fragment>
    )

}

export default Todo;