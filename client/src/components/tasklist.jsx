import { useState } from 'react';
import './components.css';
import {useNavigate} from 'react-router-dom';
function Task_list(){
    const [task,setTask]=useState('');
    const navigate=useNavigate();
    const clearsession=()=>{
        if(window.confirm("Are you sure, want to logout?")){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login');}
    }

    return(
        <>
        <div className='top'>
            <h1>Task List</h1>
            <button onClick={clearsession}>Logout</button>
        </div>
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