import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


function Navbar() {
  
  function logout(){
    axios.get('http://localhost:8080/logout').then((response)=>{
    console.log(response);
  })
  }
  
  return (
    <div className='navbar'>
      <div className='kkk'>
        <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZE04GAOT6LgF5lVla1uWH3ayJ8zGBKlIE1A&usqp=CAU'/></div>
        <div><h3>Twitter</h3></div>
      </div>
        <Link to='/create'>
            <button > Create Page
                </button>
        </Link>
        <Link to='/display'>
           <button>
           Display Page
           </button>
        </Link>
        <Link to='/mypage'>
          <button>My Page</button>
        </Link>
        <Link to='/admin'>
          <button>Admin Panel</button>
        </Link>
        <Link to='/'>
        <button>Login</button>
        <button onClick={logout}>Logout</button>
        </Link>
        
    </div>
  )
}

export default Navbar