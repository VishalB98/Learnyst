import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodoItem, currentEditTodo, isTodoEdit, updateTodoItem } from '../redux/action'

export class Todolist extends Component {
    constructor(props) {
        super(props)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.checkedTodo = this.checkedTodo.bind(this)
        this.renderFilter = this.renderFilter.bind(this)
        this.state = {
            taskRemaining: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.todoList !== this.props.todoList) {
            this.setState({
                taskRemaining: nextProps.todoList.filter(todo => todo.isChecked === false).length
            })
        }
    }

    deleteTodo = (id) => {
        console.log(id)
        const todoList = this.props.todoList.filter((todo) => todo.id !== id)
        this.props.deleteTodoItem(todoList)
    }

    editTodo = (todo) => {
        console.log(todo)
        this.props.isTodoEdit(!this.props.isEdit);
        this.props.currentEditTodo(todo);
    }

    checkedTodo = (id) => {
        const updatedItem = this.props.todoList.map((todo) => {
            return todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo;
        });
        this.props.updateTodoItem(updatedItem);

    }

    renderFilter = () => {
        let allTodoList = this.props.todoList
        console.log("filter", this.props.filter)

        if (this.props.filter === 'incomplete') {
            allTodoList = this.props.todoList.filter((todo) => todo.isChecked === false)
            console.log("incomplete", allTodoList)
        }
        else if (this.props.filter === 'complete') {
            allTodoList = this.props.todoList.filter((todo) => todo.isChecked === true)
        }
        return (
                allTodoList.map((todo) => (
                    <li key={todo.id} className="w-[100%] flex justify-around items-center p-2">
                        <input type="checkbox" checked={todo.isChecked} onClick={() => this.checkedTodo(todo.id)} />
                        <div className='w-[25%] p-2'>
                            {todo.todoText}
                        </div>
                        <button className='bg-red-500 p-5 rounded-md' onClick={() => this.deleteTodo(todo.id)}>Delete</button>
                        <button className="bg-green-500 p-5 rounded-md" onClick={() => this.editTodo(todo)}>Edit</button>
                    </li>
                ))
        )


    }

    render() {
        return (
            <div className='flex  flex-col justify-center items-center ml-12'>
                <h2 className='font-bold'>
                    {this.state.taskRemaining} task remaining
                </h2>
                {this.props.todoList.length > 0 ? this.renderFilter() : <h2 className='font-bold'>No todo </h2>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todoList: state.todoList,
        isEdit: state.isEdit,
        currentTodo: state.currentTodo,
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodoItem: (todo) => dispatch(deleteTodoItem(todo)),
        currentEditTodo: (todo) => dispatch(currentEditTodo(todo)),
        isTodoEdit: () => dispatch(isTodoEdit()),
        updateTodoItem: (todo) => dispatch(updateTodoItem(todo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist)
