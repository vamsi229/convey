import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function ChangePassword(props) {

    const [pass, setPass] = useState({password: "", newPassword: "", confirmPassword: ""}) 
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
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
    <div className="card-text pt-3">
    <form onSubmit={handleSubmit}>
        <div className="row">
        <h2>Change Password</h2>
            <div className="col-xl-3 col-sm-6 col-lg-3 my-2">
                <label htmlFor="existingPassword" className="form-label input-form-label">Current Password<span className="asterisk">*</span></label>
                <div className="d-flex">
                    <input type={showPassword1 ? "text" : "password"} className="form-control" placeholder="Enter current password" name="password" value={pass.password} onChange={onChange} />
                    <i class={showPassword1? "fa-solid fa-eye mx-2 my-2" : "fa fa-eye-slash mx-2 my-2"}  value={showPassword1}
                    onClick={() =>
                        setShowPassword1((prev) => !prev)
                    }></i>
                </div>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-xl-3 col-sm-6 col-lg-3">
                <label htmlFor="inputName" className="form-label input-form-label">New Password<span className="asterisk">*</span></label>
                <div className="d-flex">
                    <input type={showPassword2 ? "text" : "password"} className="form-control" placeholder="Enter new password" name="newPassword" minLength={5} value={pass.newPassword} onChange={onChange}/>
                    <i class={showPassword2? "fa-solid fa-eye mx-2 my-2" : "fa fa-eye-slash mx-2 my-2"}  value={showPassword2}
                    onClick={() =>
                        setShowPassword2((prev) => !prev)
                    }></i>
                </div>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-xl-3 col-sm-6 col-lg-3">
                <label htmlFor="inputName" className="form-label input-form-label">Confirm Password<span className="asterisk">*</span></label>
                <div className="d-flex">
                    <input type={showPassword3 ? "text" : "password"} className="form-control" placeholder="Confirm password"
                     name="confirmPassword" minLength={5} value={pass.confirmPassword} onChange={onChange}
                     />
                <i class={showPassword3? "fa-solid fa-eye mx-2 my-2" : "fa fa-eye-slash mx-2 my-2"}  value={showPassword3}
                    onClick={() =>
                        setShowPassword3((prev) => !prev)
                    }></i>
                </div>
            </div>
        </div>
        <br></br>
        <div className="button"><button type="submit" className="btn btn-primary submit-or-cancel-btn">Save</button></div>
    </form>
</div>
</>
  )
}
