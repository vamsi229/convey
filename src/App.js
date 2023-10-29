import './App.css';
import Home from './components/Home';
import About from './components/About';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Alert from './components/Alert';
import UserProfile from './components/UserProfile';
import UserState from './context/user/UserState';
import EditProfile from './components/editUser';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
    <UserState showAlert={showAlert}>
      <Router>
          <NavBar/>
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/"
              element={<Home showAlert={showAlert}/>}
            /> 
            <Route exact path="/about"
              element={<About showAlert={showAlert}/>}
            /> 
            <Route exact path="/login"
              element={<Login showAlert={showAlert}/>}
            /> 
            <Route exact path="/signup"
              element={<SignUp showAlert={showAlert}/>}
            /> 
            <Route exact path="/userProfile"
              element={<UserProfile showAlert={showAlert}/>}
            />
            <Route exact path="/editProfile"
              element={<EditProfile showAlert={showAlert}/>}
            />
          </Routes>
          </div> 
        </Router>
        </UserState>
    </>
  );
}

export default App;
