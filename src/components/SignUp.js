import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  const history = useNavigate()
  const [details, setDetails] = useState({userName:"", email:"", password:"", cPassword:""})
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:8808/convey/sign-up",
    {method:"POST", headers:{"Content-Type":"application/json"}, 
    body: JSON.stringify({email: details.email, password: details.password, 
      userName: details.userName, cPassword: details.cPassword})});
    const json = await response.json();
    console.log(json)
    if(json.status){
      props.showAlert(json.message, "success")
      history('/about')
    }
    else{
     props.showAlert(json.message, "danger")
    }
  }

  const onChangehandled = (e)=>{
    setDetails({...details, [e.target.name]: e.target.value})
}

  return (
    <>
    <div className="container">
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">User Name</label>
    <input type="text" className="form-control" value = {details.userName} onChange={onChangehandled} id="userName" name="userName" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value = {details.email} onChange={onChangehandled}  id="email" name="email" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value = {details.password} onChange={onChangehandled} minLength={5} name="password" id="password"  required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" value = {details.cPassword} onChange={onChangehandled} minLength={5} name="cPassword" id="cPassword" required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}
