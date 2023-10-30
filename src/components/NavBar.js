import React, {useContext, useState} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import userContext from '../context/user/UserContext';
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
    const uContext = useContext(userContext)
    const {user} = uContext
    const [userName, setUserName] = useState([])
    const onClickProfile = ()=>{
      if (user.userName){
        setUserName(user.userName)
      }
      else{
    const decoded = jwtDecode(localStorage.getItem('token'));
    console.log("decodeddd", decoded)
    setUserName(decoded.user_name)}}
    let location = useLocation();
    let history = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        history("/login")
    }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Convey</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
        </li>
       
      </ul>
      
      {!localStorage.getItem('token')?"":
      <div className="dropdown">
      <i className="fa-solid fa-user mx-4 dropdown-toggle" data-bs-toggle="dropdown" onClick={onClickProfile} aria-expanded="false"></i>
      <ul className="dropdown-menu dropdown-menu-lg-end">
      <div className="profileDetailsWrapper"><span className="ml-4 mr-10 pt-1 mx-1">
        <label className=" cursor-pointer"><div className=" user-text word-break">{userName}
        </div></label></span></div>
        {/* <li className="dropdown-item" onClick={handleLogout} role="button">{userName}</li> */}
      <Link className="dropdown-item" to="/userProfile" role="button">Profile</Link>
      <li className="dropdown-item" onClick={handleLogout} role="button">Logout</li>
      </ul>
    </div>
        }
      {!localStorage.getItem('token')?<form className="d-flex"><Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>:""}
    </div>
  </div>
</nav>
    </>
  )
}
