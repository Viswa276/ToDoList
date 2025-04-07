import './components.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function Login(){

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const takeInput=(e)=>{
        if(e.target.name==='username'){
            setUsername(e.target.value);
        }else if(e.target.name ==='password'){
            setPassword(e.target.value);
        }

    }


    return(
        <div className="Login-cont">
            <h1>Login</h1>
            <form  method="POST" action="/task-list">   
                <input aria-label='Username' type="text" placeholder="Username" onChange={takeInput} name='username'/>
                <input aria-label='password' type="password" placeholder="Password" onChange={takeInput} name='password'/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Click here</Link> </p>
        </div>
    )
}
export default Login;