import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/UserContext';


export default function UserProfile(props) {
  const profileURL = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.socialpilot.co%2Ffacebook-marketing%2Ffacebook-logo&psig=AOvVaw3BT0eiThSD9KPlk8xVeq1s&ust=1698665552378000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOD7sa-Um4IDFQAAAAAdAAAAABAH"
      const uContext = useContext(userContext)
    const {user, fetchInfo} = uContext
    const history = useNavigate()
    
    useEffect(() => {
    fetchInfo(); 
    }, []);

    const editPage = ()=>{
        history("/editProfile")
    }

  return (
    <>
    <div className="card-body p-4">
        <label className="font-weight-600 font-17">Profile Picture</label>
        <div className="display-flex mb-3 mt-2">
        <img alt="preview" className="profileImg" src={profileURL}/>
        </div><div className="font-weight-600 font-17 mt-4">Basic Info</div><div className="card-text pt-3">
        <form><div className="row"><div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Name<span className="asterisk">*</span></label>
        <div className="font-17 font-weight-bold">{user.userName}</div></div>
        <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Email<span className="asterisk">*</span></label>
        <div className="font-17 font-weight-bold">{user.email}</div></div>
        <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Phone Number</label>
        <div className="font-17 font-weight-bold">{user.phoneNumber}</div>
        </div></div><button type="button" className="btn btn-primary save-button submit-or-cancel-btn ml-2 my-4" onClick={editPage}>Edit</button></form></div></div>
    </>
  )
}
