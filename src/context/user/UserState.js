import React, { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props)=>{
    const userInitial = {}
    const [user, setUser] = useState(userInitial)
    // setUser({email:"vamsi", userName:"Grandhi"})

    const fetchInfo = () => {
        return fetch("http://localhost:8808/convey/get-user-details",
        {method:"GET", headers:{"Content-Type":"application/json", "token": localStorage.getItem('token')}})
            .then((res) => res.json())
            .then((d) => setUser(d.data))
        
        }
    
    const editUser =  async (userName, phoneNumber) => {
        console.log(userName, phoneNumber)
        const response = await fetch("http://localhost:8808/convey/update-user-details", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', "token": localStorage.getItem('token')},
            body: JSON.stringify({userName, phoneNumber})
          });
          const json = await response.json()
        if(json.status){
            props.showAlert(json.message, "success")
        }else{
            props.showAlert(json.message, "danger")
        }
    }

    return (
        <UserContext.Provider value={{user, setUser, fetchInfo, editUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;