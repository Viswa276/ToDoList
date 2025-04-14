import { useState } from 'react';
import './components.css';
import { useNavigate } from 'react-router-dom';

function Task_list() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const navigate = useNavigate();

    const clearsession = () => {
        if (window.confirm("Are you sure, want to logout?")) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
        }
    };

    const addTask = () => {
        if (task.trim() === '') return;
        if (editIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = task;
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, task]);
        }
        setTask('');
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const updateTask = (index) => {
        setTask(tasks[index]);
        setEditIndex(index);
    };

    return (
        <>
            <div className='top'>
                <h1>Task List</h1>
                <button onClick={clearsession}>Logout</button>
            </div>

            <div className='task-list-cont'>
                <div className='tasks-list'>
                    {tasks.map((t, index) => (
                        <div className='task-list-modification' key={index}>
                            <p>{t}</p>
                            <button aria-label='delete-task-button' onClick={() => deleteTask(index)}>delete</button>
                            <button aria-label='update-task-button' onClick={() => updateTask(index)}>update</button>
                        </div>
                    ))}
                </div>

                <div className='task-list-input'>
                    <input
                        type='text'
                        placeholder='Add task'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button onClick={addTask}>{editIndex !== null ? 'Update' : 'Add'}</button>
                </div>
            </div>
        </>
    );
}

export default Task_list;
