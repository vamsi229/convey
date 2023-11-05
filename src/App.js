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
import ChangePassword from './components/ChangePassword';
// import Chatting from './components/Chatting';
import TextUtil from './components/TextUtil';
import Product from './components/Product';
import ModifyProduct from './components/ModifyProduct';
import ProductState from './context/product/ProductState';


window.base_url = "http://localhost:8808/convey"
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
    <ProductState showAlert={showAlert}>
      <Router>
          <NavBar/>
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/"
              element={<Home showAlert={showAlert}/>}
            /> 
            <Route exact path="/editProduct"
              element={<ModifyProduct showAlert={showAlert} option={false}/>}
            />
            <Route exact path="/addProduct"
              element={<ModifyProduct showAlert={showAlert} option={true}/>}
            /> 
            <Route exact path="/products"
              element={<Product showAlert={showAlert}/>}
            /> 
            <Route exact path="/textutils"
              element={<TextUtil showAlert={showAlert}/>}
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
            <Route exact path="/changePassword"
              element={<ChangePassword showAlert={showAlert}/>}
            />
          </Routes>
          </div> 
        </Router>
        </ProductState>
        </UserState>
    </>
  );
}

export default App;
