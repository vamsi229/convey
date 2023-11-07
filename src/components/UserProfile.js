import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/UserContext';


export default function UserProfile() {
    
  const [edit, setEdit] = useState(1)
  // const profileURL = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.socialpilot.co%2Ffacebook-marketing%2Ffacebook-logo&psig=AOvVaw3BT0eiThSD9KPlk8xVeq1s&ust=1698665552378000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOD7sa-Um4IDFQAAAAAdAAAAABAH"
      const uContext = useContext(userContext)
    const {user, setUser, fetchInfo, editUser} = uContext
    const history = useNavigate()
    useEffect(() => {
    fetchInfo(); 
    }, []);

    const editPage = (e)=>{
        // history("/editProfile")
        setEdit(false)
    }
    const handleClick = (e)=>{ 
      if(!edit){
      setEdit(true)
      e.preventDefault()
      editUser(user.userName, user.phoneNumber, postImage.myFile)
      history("/userProfile")
      }}

    const onChange = (e)=>{
      setUser({...user, [e.target.name]: e.target.value.toString()})
  }
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

    

  return (
    <>
    {edit?
    <div className="card-body p-4">
      <h2> Profile</h2>
        <label className="font-weight-600 font-17 my-2">Profile Picture</label>
        <div className="display-flex mb-3 mt-2">
        <img alt="preview" className="profileImg" src={user.userImage} width="100rem" length ="100rem"/>
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
    : <form onSubmit={handleClick}>
    <div className="row">
    <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
       <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">User Name<span className="asterisk">*</span>
         </label><input type="text" className="form-control" placeholder="Enter name" name="userName" value = {user.userName} onChange={onChange} maxLength={25}  required/></div>
         <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Email<span className="asterisk">*</span>
         </label><input type="email" className="form-control" placeholder="Enter email" value = {user.email} disabled name="email"/></div>
       <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Phone Number
         </label><input type="tel" className="form-control" placeholder="Enter phone number" value = {user.phoneNumber}  maxLength={10}  onChange={onChange} required name="phoneNumber"/>
       </div>
    </div>
    <div className="ml-2 save-button"><button type="submit" className="btn btn-primary mr-3 submit-or-cancel-btn my-4">Save
    </button><button className="btn btn-outline submit-or-cancel-btn my-4" onClick={()=>setEdit(true)}>Cancel</button></div>
 </form>}
</>
  )
}
