import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Display.css'
function MyPage() {
    const [login,setLoginStatus]=useState();
    const [data,setData]=useState();
    const loadData=async()=>{
        const response =await axios.get("http://localhost:8080/api/get");
        setData(response.data);
    };

    useEffect(()=>{

        axios.get("http://localhost:8080/login").then((response)=>{
            // console.log(response)
            if(response.data.loggedin===true){
                {
                    setLoginStatus("Welcome "+response.data.user[0].username)
                    axios.get(`http://localhost:8080/mypage/${response.data.user[0].username}`).then((response)=>{

                            setData(response.data);
    
                    })
                    // console.log(data);
                }
                

            }
            else{
              setLoginStatus("Please Login");
            }
        
        })
    },[data]);
    const deleteTopic=(id)=>{

        
          if(window.confirm("Are you sure")){
            axios.delete(`http://localhost:8080/api/remove/${id}`);
            setTimeout(() =>loadData(),500);
          }
        
        }

  return (
 <div>
    
    <div className='displaybox'>
    <h1 style={{marginLeft:30}}>{ login}
        </h1>
    {  
        data &&  data.map((item) => {
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
        <Link to={`/get/${item.id}`}>
         <button >See Full</button>
        </Link>
        <button  onClick={()=> deleteTopic(item.id)}>Delete</button>
        </div>
        
        
        )
        })
    }
    </div>
 </div>
  )
}

export default MyPage