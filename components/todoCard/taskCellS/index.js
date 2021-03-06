import React, { useState, useEffect } from 'react'
import styles from './TaskCellS.module.scss'
import { updateTaskAction, removeTaskAction } from '../../../actions'
import { updateTaskApi, removeTaskApi } from '../../../api/todo'
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const TaskCellS = ({...props}) => {
    const myTasks = useSelector(state => state.todoList.tasks)
    const filterType = useSelector(state => state.todoList.filter)
    const dispatch = useDispatch()
    
    const [editMode, updateEditMode] = useState(false)
    const [tasks, updateTasks] = useState([])
    const [filteredTasks, updateFilteredTasks] = useState([])
    const [selectedTask, updateSelectedTask] = useState({})


    const handleSetSelectedTask = (e, task) => {
        if(e.detail === 2) {
            updateEditMode(task.createdAt)
            updateSelectedTask(task)
        }
    }

    const handleUpdateTask = async e => {
        e && e.preventDefault()
        try{
            let res = await updateTaskApi(selectedTask)
            if(res.status === 200) {
                updateEditMode(false)
                dispatch(updateTaskAction(selectedTask))
            }
        }catch(err) {
            console.log('err', err);
            
        }
    }

    const handleRemoveTask = async task => {
        try{
            let res = await removeTaskApi(task)
            if(res.status === 200) {
                dispatch(removeTaskAction(task))
            }
        }catch(err) {
            console.log('err', err);
            
        }
    }

    const handleCompleteTask = async task => {
        let myTask = {...task, completed: !task.completed}
        
        try{
            let res = await updateTaskApi(myTask)
            if(res.status === 200) {
                dispatch(updateTaskAction(myTask))
            }
        }catch(err) {
            console.log('err', err);
        }
    }

    const handleAction = (type, task) => {
        updateEditMode(false)
        switch (type) {
            case 'UPDATE':
                handleUpdateTask()
                break;
            case 'REMOVE':
                handleRemoveTask(task)
                break;
            case 'CHANGE_COMPLETED_STATUS':
                handleCompleteTask(task)
                break;
        }
    }

    const activeList = () => {
        switch (filterType) {
            case 'ALL':
                return tasks
            case 'ACTIVE':
                return filteredTasks
            default:
                return tasks
        }
    }

    const renderMessageOnEmptyList = () => {
        if(filterType === 'ALL') return 'No task exist'
        else if(filterType === 'ACTIVE') return 'No active task exist'
    }

    useEffect(() => {      
        let tempArr = myTasks.map(task => ({...task}))
        updateTasks(tempArr)
        updateFilteredTasks(tempArr.filter(task => !task.completed))
    }, [myTasks, filterType])

    return (
        <div className={styles.listContainer}>
            {activeList()?.length > 0 
                ?   activeList()?.map(task => 
                        <div className={styles.rowContainer} key={task.id}>
                            <div className={styles.actionWrapper}>
                                <input type='checkbox' checked={task.completed} className={styles.checkbox} onChange={() => handleAction('CHANGE_COMPLETED_STATUS', task)}/>
                            </div>
                            <div className={styles.taskMessageWrapper} onClick={(e) => handleSetSelectedTask(e, task) }>
                                {task.createdAt === editMode 
                                    ?   <form className={styles.updateTaskInputSection} onSubmit={handleUpdateTask}>
                                            <input 
                                                type='text' 
                                                className={styles.updateTaskInput} 
                                                value={selectedTask.note}
                                                onChange={e => updateSelectedTask(task => {return ({...task, note: e.target.value})})}
                                            />
                                        </form>
                                    :   <span className={styles.taskMessage}>{task.note}</span>
                                }
                            </div>
                            <div 
                                className={styles.actionWrapper}
                                onClick={() => handleAction(task.createdAt === editMode ? 'UPDATE' : 'REMOVE', task)}
                            >
                                {task.createdAt === editMode 
                                    ?   <span className={styles.actionText}>Update</span>
                                    :   <FaTimes />
                                }
                            </div>
                        </div>
                    )
                :   <div className={styles.noItemExist}>
                        {renderMessageOnEmptyList()}
                    </div>
            }
        </div>
        
    )
}
export default TaskCellS