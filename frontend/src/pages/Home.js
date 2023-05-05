import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Home.css';
function Home() {
    const [user,setUser]=useState({
        title:"",
        body:"",
        timestamp:'',
        username:''
    })
    const{id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/get/${id}`)
        .then((resp)=>setUser({ ...resp.data[0] }));
    },[id]);

    function handlechange(event){
        let value=event.target.value;
        let name=event.target.name;
        setUser((preval=>{
            return{
                ...preval,
            [name]:[value]
            }
        }))
    }
    const navigate=useNavigate();
    
    function handlesubmit(event){
        if(!user.body || !user.title){
         alert("Enter Valid Details");   
        }
        else{
            if(!id){
            var date=new Date();
            date=date.toISOString().slice(0, 19).replace('T', ' ');
            user.timestamp=date;
            axios.get("http://localhost:8080/login").then((response)=>{
            console.log(response)
            if(response.data.loggedin===true ){
                {
                   const v=response.data.user[0].username;
                   user.username=v;
                   console.log(user.username)
                   console.log(user);
            console.log(date);
            axios.post('http://localhost:8080/api/auth',user).then(()=>{
                setUser({
                    title:"",
                    body:"",
                    timestamp:'',
                    username:''

                })
            })
            navigate('/display');
            // setTimeout(()=>navigate('/display'),500)
                }

            }
            else{
                // user.username="Anon"
                alert("Login please")
                navigate('/')
                // setTimeout(()=>navigate('/'),500)
            }
            
        })
            }
            else{
                var date=new Date();
            date=date.toISOString().slice(0, 19).replace('T', ' ');
            user.timestamp=date;
            
            axios.put(`http://localhost:8080/api/update/${id}`,{
                title:user.title,
                body:user.body,
                timestamp:user.timestamp

            }).then(()=>{
                setUser({title:"",body:"",timestamp:""});
            })
            navigate('/display');
            }  
        }
    }
  return (
        <div className='home'>
            <p>Title</p>
            <input type='text' name='title' value={user.title} onChange={handlechange}/>
            <p>Body</p>
            <textarea type='text' name='body' value={user.body} onChange={handlechange}/><br/>
            <button onClick={handlesubmit}>Submit</button>
        </div>
  )
}

export default Home




