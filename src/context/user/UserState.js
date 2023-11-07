import React, { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props)=>{
    const userInitial = {}
    const [user, setUser] = useState(userInitial)
    // setUser({email:"vamsi", userName:"Grandhi"})

    const fetchInfo = () => {
        return fetch(`${window.base_url}/get-user-details`,
        {method:"GET", headers:{"Content-Type":"application/json", "token": localStorage.getItem('token')}})
            .then((res) => res.json())
            .then((d) => setUser(d.data))
        }
    
    const editUser =  async (userName, phoneNumber, userImage) => {
        const response = await fetch(`${window.base_url}/update-user-details`, {
            method: 'PUT',
            headers:{"Content-Type":"application/json", "token": localStorage.getItem('token')},
            body: JSON.stringify({"userImage": userImage, "userName": userName, "phoneNumber": phoneNumber})
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