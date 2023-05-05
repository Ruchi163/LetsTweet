import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Seefull(){
    const[data,setData]=useState([]);
    const{id}=useParams();
    const loadData=async()=>{
        const response =await axios.get(`http://localhost:8080/api/get/${id}`);
        setData(response.data);
    
    };

    useEffect(()=>{
        loadData();
    },[]);



  return (
    <div>

<div className='displaybox'>
    
{data.map((item) => {
    return (
      <div className='individualbox'>
        <h2>Full Tweet</h2>
        <h4>{item.title}</h4>
        <p>{item.body}</p>

        <p>{item.timestamp}</p>
    
</div>
       
    )
    })}
    <Link to='/display'>
    <button>Go Back</button>
    </Link>
    <Link to={`/update/${id}`}>
        <button>Update</button>
    </Link>
</div>
</div>
)

}

export default Seefull;
