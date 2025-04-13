import './components.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate=useNavigate();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handelLoginRequest=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/login",{username:Username,password:Password})
        .then(res=>{
            if(res.data.message === "Login Successful"){
                localStorage.setItem("accesstoken",res.data.accessToken)
                localStorage.setItem("refreshToken",res.data.refreshToken)
                navigate('/task-list');
            }
            else{
                alert("Login Failed");
            }
            console.log(res);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    

    return(
        <div className="Login-cont">
            <h1>Login</h1>
            <form  method="POST" onSubmit={handelLoginRequest}>   
                <input aria-label='Username' type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} name='username'/>
                <input aria-label='password' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} name='password'/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Click here</Link> </p>
        </div>
    )
}
export default Login;