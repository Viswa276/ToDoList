import './components.css';
import {use, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

function Register() {
    
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const data = {
        username: Username,
        email: Email,       
        password: Password  
    };
    const navigate=useNavigate();
    console.log(data)
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/register",data)
        .then(res=>{
            console.log(res);
            navigate('/login')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='Login-cont'>
            <h1>Register</h1>
            <form method="POST" action="/register" onSubmit={handleSubmit}>
                <input name='email' aria-label='email' type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <input name='username' aria-label='username' type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
                <input name='password' aria-label='password' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit" >Register</button>
            </form>
            <p>Already have account? <Link to="/login">click me</Link></p>
        </div>
    );
}
export default Register;