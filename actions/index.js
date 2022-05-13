
export const addNewTaskAction = newTask => (dispatch, getState) => {
    dispatch({
        type: 'ADD_NEW_TASK',
        payload: newTask
    })
}

export const updateTaskAction = task => (dispatch, getState) => {
    dispatch({
        type: 'UPDATE_TASK',
        payload: task
    })
}

export const updateFilterAction = type => (dispatch, getState) => {
    dispatch({
        type: 'UPDATE_FILTER',
        payload: type
    })
}

export const removeTaskAction = task => (dispatch, getState) => {
    dispatch({
        type: 'REMOVE_TASK',
        payload: task
    })
}

export const removeCompletedTasksAction = tasks => (dispatch, getState) => {
    dispatch({
        type: 'REMOVE_COMPLETED_TASKS',
        payload: tasks
    })
}

export const setAllTasksAction = tasks => (dispatch, getState) => {
    dispatch({
        type: 'SET_ALL_TASKS',
        payload: tasks
    })
}