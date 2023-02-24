import './TodoList.css'
import React from 'react';
import Todo from './Todo';

function TodoList(props) {

    return (
        <React.Fragment>
            <div>
                <table className='todo-table'>
                    <tbody>
                        {
                            props.todos.map(todo => (
                                <tr key={todo.t_id} className='todo-info'>
                                    {/* <td>
                                        {todo.t_id}
                                    </td> */}
                                    

                                    <Todo todo={todo} editTodo={props.editTodo} deleteTodo={props.deleteTodo} updateTodo={props.updateTodo} />
                    
                                    {/* <td className = 'controls'>
                                        <div className='separator'></div>
                                        <button className='edit-btn' value={todo.t_id} onClick={props.editTodo}>Edit</button>
                                        <button className='delete-btn'value={todo.t_id} onClick={props.deleteTodo}>Delete</button>
                                    </td> */}
                                    
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default TodoList;