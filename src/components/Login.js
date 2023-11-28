import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8808/convey/login",
        {method:"POST", headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify({email: credentials.email, password: credentials.password})});
        const json = await response.json();
        if (json.status){
          localStorage.setItem('token', json.data.authToken)
          history("/")
        props.showAlert(json.message, "success")

        }
        else{
          props.showAlert(json.message, "danger")
        }
        
    }
    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <>
    <h3 className="my-1">Please Enter your credentials to continue</h3>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label my-2">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}
