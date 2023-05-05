import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Login.css'

 axios.defaults.withCredentials=true;
function Login() {

    const [loginStatus,setLoginStatus]=useState('');
    useEffect(()=>{
        axios.get("http://localhost:8080/login").then((response)=>{
            console.log(response)
            if(response.data.loggedin===true){
                {
                    setLoginStatus(response.data.user[0].username)
                }

            }
        /* Used to send cookies to the server. */
        })
    },[]);



    const [user,setUser]=useState({
    username:'',
    password:''
})

function hashing(password){
    password=password.toString();
    const search = 'a';
    const replaceWith = '-';
  
  const ans = password.split(search).join(replaceWith);
    return ans;
  }

function handlechange(event){
    let value=event.target.value;
    let name=event.target.name;
    setUser((preval)=>{
        return{
            ...preval,
            [name]:[value]
        }
    })
}

const navigate=useNavigate();
function handlesubmit(event){
    console.log(user);
    if(!user.username ||! user.password){
        alert("Please Enter Data");
    }
    else{
        user.password=hashing(user.password);
        axios.post("http://localhost:8080/login",user).then((response)=>{
            setUser({username:"",password:""})
            if(response.data.message){
                setLoginStatus(response.data.message);
            }
            else{
                setLoginStatus(response.data[0].username);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
     if(loginStatus==='admin'){
        setTimeout(()=>navigate('/admin'),500)
     }
     else{
         setTimeout(()=>navigate('/display'),500)
     }

}
return (
<div className='t'>
    <h1>Login here</h1>
    <p>Username</p>
    <input type='text' name='username' value={user.username} onChange={handlechange}/><br/>
    <p>Password</p>
    <input type='text' name='password' value={user.password} onChange={handlechange}></input><br/>
    
    <button onClick={handlesubmit}>Login</button>
    <Link to='/signup'>
        <button>Sign Up</button>
    </Link>
    <h3>{loginStatus}</h3>
</div>
)
}

export default Login