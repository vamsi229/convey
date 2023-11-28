import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function CustomerSupport(props) {
    const [support, setSupport] = useState({email: "", message: ""})
    const history = useNavigate()

    const onSubmitClick = async (e)=>{
        e.preventDefault()
        const response = await fetch(`${window.base_url}/support`,{
            method: 'POST',
            headers: {"Content-Type":"application/json", "token": localStorage.getItem('token')},
            body: JSON.stringify({"email":support.email, "message": support.message})
        })
        const json = await response.json()
        if(json.status){
            props.showAlert(json.message, "success")
            history("/")
        }
        else{
            props.showAlert(json.message, "danger")
        }
    }
    

    const onChange = (e)=>{
        setSupport({...support, [e.target.name]: e.target.value})
    }

  return (
    <>
    <div className="container">
    <h3 className="my-1">Please Enter your Concern</h3>
    <form onSubmit={onSubmitClick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label my-2">Email address</label>
    <input type="email" className="form-control" value={support.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="message" className="form-label">Message</label>
    <input type="text" className="form-control" value={support.message} onChange={onChange} name="message" id="message" required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}
