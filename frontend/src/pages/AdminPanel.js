import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import './AdminPanel.css'
import { Link } from 'react-router-dom';
function Dis() {
  const inputref = useRef(null);
  const [data, setData] = useState([]);
  function handlesubmit(event) {
    const name = inputref.current.value;
    axios.get(`http://localhost:8080/mypage/${name}`).then((response) => {
      setData(response.data);
    })
  }
  return (
    <div className='displaybox'>
      <input type='text' ref={inputref} />
      <button onClick={handlesubmit}>Submit</button>
    </div>
  )
}



function AdminPanel() {
  const inputref = useRef(null);
  const [data, setData] = useState([]);
  const [state, setState] = useState("");
  const [show,setShow]=useState(false);
  const loadData = async () => {
    const response = await axios.get("http://localhost:8080/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();

  }, []);

  const [loginStatus, setLoginStatus] = useState();
  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      console.log(response)
      if (response.data.loggedin === true && response.data.user[0].isadmin == '1') {
        {
          setLoginStatus(response.data.user[0].username)
          setState("Welcome Back " + response.data.user[0].username)
          setShow(true)
        }

      }
      else {
        setState("Not Admin")
        setShow(false);
      }
      /* Used to send cookies to the server. */
    })
  }, []);


  const deleteTopic = (id, username) => {

    if (loginStatus == 'admin') {
      if (window.confirm("Are you sure")) {
        axios.delete(`http://localhost:8080/api/remove/${id}`);
        setTimeout(() => loadData(), 500);
      }
    }
    else {
      alert("You are not Admin");
    }
  }
  function handlesubmit(event) {
    const name = inputref.current.value;
    axios.get(`http://localhost:8080/mypage/${name}`).then((response) => {
      setData(response.data);
    })
  }






  return (
    <div>

      <div className='displaybox' id="tw">
        <h1>{state}</h1>

        {show && <div className='displaybox'>
          <input type='text' ref={inputref} />
          <button onClick={handlesubmit}>Submit</button>
        </div>}
        {loginStatus &&
          data.map((item) => {

            return (
              <div className='individualbox '>
                {/* <h1>{loginStatus}</h1> */}
                <div className='dis'>
                  <img src='https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg' />
                  <div className='tt'>
                    <h2>{item.username}</h2>
                    <p className='f'>{item.timestamp}</p>
                  </div>
                </div>
                <h2>{item.title}</h2>
                {/* <p>key={item.id}</p> */}
                <p>{item.body}</p>

                <p></p>
                <Link to={`/get/${item.id}`}>
                  <button >See Full</button>
                </Link>
                <button onClick={() => deleteTopic(item.id, item.username)}>Delete</button>
              </div>

            )
          })}
      </div>



    </div>
  )
}

export default AdminPanel