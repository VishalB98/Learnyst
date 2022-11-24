import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo, isTodoEdit, setCurrentTodo, updateTodoItem, filterTodoList } from '../../src/redux/action'
import Todolist from './todolist'

function Todo(props) {
    const [todoValue, setTodoValue] = useState('')

    const handleInputChange = (e) => {
        setTodoValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(todoValue)
        if (todoValue !== '') {
            props.addTodo({
                id: props.todoList.length + 1,
                todoText: todoValue.trim(),
                isChecked: false
            })
        }
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        handleUpdateTodo(props.currentEditTodo.id, props.currentEditTodo);
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = props.todoList.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        props.isTodoEdit(false);
        props.updateTodoItem(updatedItem);
    }

    function handleEditInputChange(e) {
        props.setCurrentTodo({ ...props.currentEditTodo, todoText: e.target.value });
        console.log(props.currentEditTodo);
    }

    const showAll = () => {
        props.filterTodoList('all')
    }

    const showIncomplete = () => {
        props.filterTodoList('incomplete')
    }

    const showComplete = () => {
        props.filterTodoList('complete')
    }

    return (
        <div className='todo'>
            {props.isEdit ? (
                <div className='flex justify-around mt-7 items-center'>
                    <form onSubmit={handleEditFormSubmit} className="contents">
                        <label  className='font-bold' htmlFor="editTodo">Edit todo</label>
                        <input
                            name="editTodo"
                            type="text"
                            className='border-2 border-gray-300 p-2 rounded-lg'
                            placeholder={props.currentEditTodo.todoText}
                            value={props.currentEditTodo.todoText}
                            onChange={handleEditInputChange}
                        />
                        <button className="bg-green-500 p-5 rounded-md" type="submit">Update</button>
                        <button className="bg-red-500 p-5 rounded-md" onClick={() => props.isTodoEdit(false)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <div className='flex justify-around mt-7'>
                    <form onSubmit={handleSubmit} className="contents">
                        <input type='text'
                            className='border-2 border-gray-300 p-2 rounded-lg'
                            placeholder='Enter your todo'
                            value={todoValue}
                            onChange={handleInputChange}
                        />
                        <button className="bg-green-500 p-2 rounded-md" type='submit'>Add Todo</button>
                    </form>
                </div>
            )
            }
            <div className='flex justify-around mt-9'>
                <button onClick={showComplete} className="bg-green-500 p-5 rounded-md">Show Complete Task</button>
                <button onClick={showIncomplete} className="bg-red-500 p-5 rounded-md" >Show Incomplete Task</button>
                <button onClick={showAll} className="bg-yellow-500 p-5 rounded-md">Show All Task</button>
            </div>
            <Todolist todoList={props.todoList} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        todoList: state.todoList,
        isEdit: state.isEdit,
        currentEditTodo: state.currentEditTodo,
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => dispatch(addTodo(todo)),
        isTodoEdit: () => dispatch(isTodoEdit()),
        setCurrentTodo: (todo) => dispatch(setCurrentTodo(todo)),
        updateTodoItem: (todo) => dispatch(updateTodoItem(todo)),
        filterTodoList: (todo) => dispatch(filterTodoList(todo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
