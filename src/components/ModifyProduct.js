import React, { useContext, useState } from 'react'
import productContext from '../context/product/ProductContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';


export default function ModifyProduct(props) {
    const history = useNavigate();
    const pContext = useContext(productContext)
    const {product, setProduct, addProduct, updateProduct} = pContext
    const location = useLocation();
    useEffect(()=>{
      if(!product.name && location.pathname !== "/addProduct"){
      history("/products")}
    },[])

    const handleClick = (e) => {
      e.preventDefault()
      var image = productImage.myFile
      if (productImage.myFile.length === 0){
        image = product.image
        }
     
      if(props.option === 'edit'){
        updateProduct(product.productId, image)
      }
      else{
        addProduct(image)
      }
      history("/products")
    }

    const onChange = (e)=>{
      setProduct({...product, [e.target.name]: e.target.value.toString()})
  }
  const [productImage, setProductImage] = useState({
    myFile: "",
  });
  const handleFileUpload = async (e) => {

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProductImage({ ...productImage, myFile: base64 });
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

  const onEditClick = ()=>{
    history("/editProduct")
  }

  const OnClickGiveRating = () => {
    history("/rating", 
    {state: {"productId": product.productId}})
  
  }
  return (
   <>{props.option === 'details'?
    <div className="card-body p-4">
      <h2> Product</h2>
        <label className="font-weight-600 font-17 my-2">Product Photo</label>
        <div className="display-flex mb-3 mt-2">
        <img alt="preview" className="profileImg" src={product.image} width="200rem" length ="200rem"/>
        </div><div className="font-weight-600 font-17 mt-4">Product Details</div><div className="card-text pt-3">
        <form><div className="row"><div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Product Name</label>
        <div className="font-17 font-weight-bold">{product.name}</div></div>
        <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Description</label>
        <div className="font-17 font-weight-bold">{product.description}</div></div>
        <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Price</label>
        <div className="font-17 font-weight-bold">{product.price?.toLocaleString("en-US")}</div>
        </div><div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Ram</label>
        <div className="font-17 font-weight-bold">{product.ram}</div>
        </div><div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Storage</label>
        <div className="font-17 font-weight-bold">{product.storage}</div>
        </div><div className="col-xl-3 col-sm-6 col-lg-3 inputType">
        <label htmlFor="inputName" className="form-label input-form-label">Operating System</label>
        <div className="font-17 font-weight-bold">{product.operatingSystem}</div>
        </div>
        <div>
        {product.aggregatedRating>0.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
        {product.aggregatedRating>1.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
        {product.aggregatedRating>2.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
        {product.aggregatedRating>3.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
        {product.aggregatedRating>4.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
        <p className="ml-2">{`${product.aggregatedRating} ( ${product.count})`}</p> 
        </div>
        </div>
        <button type="button" className="btn btn-primary save-button submit-or-cancel-btn ml-2 my-4 mx-2" onClick={()=>{OnClickGiveRating()}}>
          Give Rating</button>
        <button type="button" className="btn btn-primary save-button submit-or-cancel-btn ml-2 my-4 mx-2" onClick={onEditClick}>
          Edit</button></form></div></div>
    : 
   <>
   <form onSubmit={handleClick}>
    <div className="row">
    <div className="display-flex mb-3 mt-2">
    <img alt="preview" className="profileImg" src={productImage.myFile? productImage.myFile: product.image} width="200rem" length ="200rem"/>
    </div>
    <label htmlFor="inputName" className="form-label input-form-label">Product Image<span className="asterisk">*</span></label>
    {props.option === "edit" ?
    <input
          alt="preview"
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
          filename={product.image}
          
        />:
        <input
        alt="preview"
        type="file"
        label="Image"
        name="myFile"
        accept=".jpeg, .png, .jpg"
        onChange={(e) => handleFileUpload(e)}
        filename={product.image}
        required
        
      />}
        <br/><br/><br/>
       <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Product Name<span className="asterisk">*</span>
         </label><input type="text" className="form-control" placeholder="Enter name" name="name" value = {product.name} 
         onChange={onChange} maxLength={25}  required/></div>
         <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Description<span className="asterisk">*</span>
         </label><input type="text" className="form-control" placeholder="Enter Description" value = {product.description}
          onChange={onChange} name="description" required/></div>
       <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Price<span className="asterisk">*</span>
         </label><input type="number" className="form-control" placeholder="Enter Price" value = {product.price} min={100} max={1000000} required 
         onChange={onChange} name="price"/>
       </div>
       <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Ram Storage
         </label><input type="number" className="form-control" placeholder="Enter the RAM" value = {product.ram}  onChange={onChange}
           name="ram"/>
       </div>
       <br/><br/><br/><br/>
       <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Internal Storage
         </label><input type="number" className="form-control" placeholder="Enter the Internal Storage" value = {product.storage} 
         onChange={onChange} name="storage"/>
       </div>
       <div className="col-xl-3 col-sm-6 col-lg-3 inputType">
         <label htmlFor="inputName" className="form-label input-form-label">Operating System
         </label><input type="tel" className="form-control" placeholder="Enter Operating System" value = {product.operatingSystem} 
         onChange={onChange} name="operatingSystem"/>
       </div>
    </div>
    <div className="ml-2 save-button"><button type="submit" className="btn btn-primary mr-3 submit-or-cancel-btn my-4">Save
    </button><button className="btn btn-outline submit-or-cancel-btn my-4" onClick={() => {history("/products")}}>Cancel</button></div>
 </form> </>}
   </>
  )
}
