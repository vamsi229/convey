import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/UserContext';


export default function EditProfile(props) {
    const history = useNavigate()
    const uContext = useContext(userContext)
    const {user, setUser, editUser} = uContext

    const handleClick = (e)=>{ 
      editUser(user.userName, user.phoneNumber)
      history("/userProfile")
  }

    const onChange = (e)=>{
      setUser({...user, [e.target.name]: e.target.value})
  }
  return (
    <>
    <form onSubmit={handleClick}>
   <div className="row">
      <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">User Name<span className="asterisk">*</span>
        </label><input type="text" className="form-control" placeholder="Enter name" name="userName" value = {user.userName} onChange={onChange} required/></div>
        <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Email<span className="asterisk">*</span>
        </label><input type="email" className="form-control" placeholder="Enter email" value = {user.email} disabled name="email"/></div>
      <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Phone Number
        </label><input type="number" className="form-control" placeholder="Enter phone number" value = {user.phoneNumber} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" size={10}  onChange={onChange} name="phoneNumber"/>
      </div>
   </div>
   <div className="ml-2 save-button"><button type="submit" className="btn btn-primary mr-3 submit-or-cancel-btn my-4">Save
   </button><button className="btn btn-outline submit-or-cancel-btn my-4">Cancel</button></div>
</form>
</>
  )
}
