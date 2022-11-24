import {ADD_TODO, DELETE_TODO, IS_EDIT, CURRENT_EDIT_TODO, SET_CURRENT_TODO, UPDATE_TODO, FILTER_TODO_LIST} from './constant';

export function addTodo(payload) {
  console.log(payload)
  return (dispatch) => {
    dispatch({ type: ADD_TODO, payload });
  };
}

export function deleteTodoItem(payload) {
  console.log(payload)
  return (dispatch) => {
    dispatch({ type: DELETE_TODO, payload });
  };
}

export function isTodoEdit() {
  return(dispatch) => {
    dispatch({type: IS_EDIT});
  }
}

export function currentEditTodo(payload) {
  return(dispatch) => {
    dispatch({type: CURRENT_EDIT_TODO, payload});
  }
}

export function setCurrentTodo(payload) {
  return(dispatch) => {
    dispatch({type: SET_CURRENT_TODO, payload});
  }
}

export function updateTodoItem(payload) {
  return(dispatch) => {
    dispatch({type: UPDATE_TODO, payload});
  }
}

export function filterTodoList(payload) {
  return(dispatch) => {
    dispatch({type: FILTER_TODO_LIST, payload});
  }
}