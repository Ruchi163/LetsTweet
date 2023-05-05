import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
function Signup() {
    const [user,setUser]=useState({
        username:"",
        password:"",
        email:"",
        isadmin:0

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
    function myfunc(){

            let person = prompt("Please enter the Code:", "****");
            if (person = "1234" ) {
                return 1;
            } else {
                return 0;
            }
    }
    const navigate=useNavigate();
    function handlesubmit(event){
        console.log(user);
        if(!user.username || !user.email ||! user.password){
            alert("Please Enter Data");
        }
        else{
            if(user.isadmin==1){
               user.isadmin= myfunc();
            }
            user.password=hashing(user.password);
            axios.post("http://localhost:8080/adduser",user).then(()=>{
                setUser({username:"",email:"",password:"",isadmin:0})
            }).catch((err)=>{
                console.log(err);
            })
            setTimeout(()=>navigate('/'),500)

        }
        


    }


  return (
    <div className='t'>
        <h1>Sign Up</h1>
        <p>Username</p>
        <input type='text' name='username' value={user.username} onChange={handlechange}/>
        <p>Email</p>
        <input type='text' name='email' value={user.email} onChange={handlechange}/>
        <p>Password</p>
        <input type='text' name='password' value={user.password} onChange={handlechange}/><br/>

        <input type="radio" value="1" name="isadmin"onChange={handlechange} /> Admin
        <input type="radio" value="0" name="isadmin"onChange={handlechange} /> User<br/>
        

        <button onClick={handlesubmit}>Submit</button>
    </div>
  )
}

export default Signup