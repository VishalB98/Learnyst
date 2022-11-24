const initialState = {
    todoList:[],
    isEdit: false,
    currentEditTodo: {},
    filter : "all"

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            }
        case 'DELETE_TODO':
            return {
                todoList: action.payload
            }
        case 'IS_EDIT':
            console.log("action.payload", action)
            return {
                ...state,
                isEdit: !state.isEdit
            }
        case 'CURRENT_EDIT_TODO':
            return {
                ...state,
                currentEditTodo: action.payload
            }
        case 'SET_CURRENT_TODO':
            return {
                ...state,
                currentEditTodo: action.payload
            }
        case 'UPDATE_TODO':
            return {
                ...state,
                todoList: action.payload
            }
        case 'FILTER_TODO_LIST':
            console.log("action.payload", action.payload)
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state
    }
}

export default reducer;