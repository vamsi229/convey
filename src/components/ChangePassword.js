import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function ChangePassword(props) {

    const [pass, setPass] = useState({password: "", newPassword: "", confirmPassword: ""}) 
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8808/convey/change-password",
        {method:"PUT", headers:{"Content-Type":"application/json","token": localStorage.getItem('token')}, 
        body: JSON.stringify({password: pass.password, newPassword: pass.newPassword, confirmPassword: pass.confirmPassword})});
        const json = await response.json();
        if (json.status){
          history("/")
        props.showAlert(json.message, "success")
        }
        else{
          props.showAlert(json.message, "danger")
        }
        
    }
    const onChange = (e)=>{
      setPass({...pass, [e.target.name]: e.target.value.toString()})
  }
  return (
    <>
    <div class="card-text pt-3">
    <form onSubmit={handleSubmit}>
        <div class="row">
        <h2>Change Password</h2>
            <div class="col-xl-3 col-sm-6 col-lg-3 my-2">
                <label htmlFor="existingPassword" class="form-label input-form-label">Current Password<span class="asterisk">*</span></label>
                <div class="d-flex">
                    <input type="password" class="form-control" placeholder="Enter current password" name="password" value={pass.password} onChange={onChange} />
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <label htmlFor="inputName" class="form-label input-form-label">New Password<span class="asterisk">*</span></label>
                <div class="d-flex">
                    <input type="password" class="form-control" placeholder="Enter new password" name="newPassword" minLength={5} value={pass.newPassword} onChange={onChange}/>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <label htmlFor="inputName" class="form-label input-form-label">Confirm Password<span class="asterisk">*</span></label>
                <div class="d-flex">
                    <input type="password" class="form-control" placeholder="Confirm password" name="confirmPassword" minLength={5} value={pass.confirmPassword} onChange={onChange}/>
                </div>
            </div>
        </div>
        <br></br>
        <div class="button"><button type="submit" class="btn btn-primary submit-or-cancel-btn">Save</button></div>
    </form>
</div>
</>
  )
}
