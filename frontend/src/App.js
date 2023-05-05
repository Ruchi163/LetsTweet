import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import AdminPanel from './pages/AdminPanel';
import Display from './pages/Display';
import Home from './pages/Home';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Navbar from './pages/Navbar';
import Seefull from './pages/Seefull';
import Signup from './pages/Signup';
<style>
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+Double+Pica&display=swap');
</style>



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route  path='/display' element={<Display/>}/>
            <Route  path='/mypage' element={<MyPage/>}/>
            <Route  path='/create' element={<Home/>}/>
            <Route  path='/update/:id' element={<Home/>}/>
            <Route  path='/get/:id' element={<Seefull/>}/>
            <Route  path='/signup' element={<Signup/>}/>
            <Route  path='/admin' element={<AdminPanel/>}/>
        </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
