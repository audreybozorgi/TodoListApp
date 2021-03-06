import React, {useState} from 'react'
import styles from './AddNewTaskForm.module.scss'
import { addNewTaskAction } from '../../../actions'
import { addNewTaskApi } from '../../../api/todo'
import { newTaskGenerator } from '../../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa';


interface FormComponent {
    e: Object,
    preventDefault: Function,
    
}

const AddNewTaskForm = () => {
    const dispatch = useDispatch()
    const [newNote, updateNewNote] = useState('')

    const handleSubmit = async (e:FormComponent) => {
        e.preventDefault()
        if(newNote === '') return
        const newTask = newTaskGenerator(newNote)

        try{
            let res = await addNewTaskApi(newTask)
            if(res.status === 201) {
                dispatch(addNewTaskAction(res.data))
                updateNewNote('')
            }
        }catch(error) {
            console.log('error', error);
        }
    }

    return (
        <form className={styles.inputSection} onSubmit={handleSubmit}>
            <input 
                type='text' 
                className={styles.customInput} 
                value={newNote}
                onChange={e => updateNewNote(e.target.value)}
                placeholder='What need to be done?'
            />
            <div className={styles.buttonWrapper}>
                <button className={styles.addButton} type='submit'>
                    <FaPlus className={styles.buttonText} />
                </button>
            </div>
        </form>
    )
}
export default AddNewTaskForm