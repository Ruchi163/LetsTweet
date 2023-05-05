import React, { useEffect, useState } from 'react'
import axios from  "axios";
import './Display.css'
import { Link, useParams } from 'react-router-dom';
function Display() {
    const[data,setData]=useState([]);
    const[state,setState]=useState("");
    const loadData=async()=>{
        const response =await axios.get("http://localhost:8080/api/get");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
       
    },[]);

    const [loginStatus,setLoginStatus]=useState('Login Please');
    useEffect(()=>{
        axios.get("http://localhost:8080/login").then((response)=>{
            console.log(response)
            if(response.data.loggedin===true ){
                {
                    setLoginStatus(response.data.user[0].username)
                    setState("Welcolme Back "+response.data.user[0].username)
                }

            }
            else{
              setState("Please Login")
            }
        /* Used to send cookies to the server. */
        })
    },[]);


    const deleteTopic=(id,username)=>{

      if(loginStatus=='admin' ){
        if(window.confirm("Are you sure")){
          axios.delete(`http://localhost:8080/api/remove/${id}`);
          setTimeout(() =>loadData(),500);
        }
      }
        else{
          alert("You are not Allowed");
        }
      }


  return (
    <div>

<div className='displaybox'>
<h1>{state}</h1>
{ 
data.map((item) => {
    return (
      <div className='individualbox '>
        {/* <h1>{loginStatus}</h1> */}
        <div className='dis'>
        <img src='https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'/>
       <div className='tt'>
       <h2>{item.username}</h2>
       <p className='f'>{item.timestamp}</p>
       </div>
        </div>
        <h2>{item.title}</h2>
        {/* <p>key={item.id}</p> */}
        <p>{item.body}</p>
       
        <p></p>
        {/* <Link to={`/get/${item.id}`}>
         <button >See Full</button>
        </Link>
        <button  onClick={()=> deleteTopic(item.id,item.username)}>Delete</button> */}
</div>
       
    )
    })}
</div>



    </div>
  )
}

export default Display