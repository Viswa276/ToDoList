import { useState } from 'react';
import './components.css';
function Task_list(){
    const [task,setTask]=useState('');
    return(
        <>
        <h1>Task List</h1>
        <div className='task-list-cont'>
            <div className='tasks-list'>
                <div className='task-list-modification'>
                    <p>lorem</p>
                    <button aria-label='delete-task-button'>delete</button>
                    <button aria-label='update-task-button'>update</button>
                    <hr></hr>
                </div>
            </div>
            <div className='task-list-input'>
                <input type='text' placeholder='Add task' value={task} onChange={(e)=>setTask(e.target.value)}/>
                <button>Add</button>
            </div>
        </div>
        </>
    );
}
export default Task_list;