import React, { useState } from "react";
import ProductContext from "./ProductContext";
import { json } from "react-router-dom";

const ProductState = (props)=>{
    const productInitial = {}
    const [product, setProduct] = useState(productInitial)

    const fetchProducts = () => {
        return fetch(`${window.base_url}/get-user-details`,
        {method:"GET", headers:{"Content-Type":"application/json", "token": localStorage.getItem('token')}})
            .then((res) => res.json())
            .then((d) => setProduct(d.data))
        }
    
    const addProduct = async () => {
        console.log(product)
        const response = await fetch(`${window.base_url}/products/add-product`, {
            method: 'POST',
            headers: {"Content-Type":"application/json", "token": localStorage.getItem('token')},
            body: JSON.stringify({"image": product.image, "name": product.name, "description": product.description,
            "ram": product.ram, "storage": product.storage, "operatingSystem": product.operatingSystem, "price": product.price})})
        const json = await response.json()

        if(json.status){
            props.showAlert(json.message, "success")
        }
        else{
            props.showAlert(json.message, "danger")
        }
    }
    
    const editProduct = async (product_id) => {
        const response = await fetch(`${window.base_url}/edit-product`, {
            method: 'PUT',
            headers: {"Content-Type":"application/json", "token": localStorage.getItem('token')},
            body: JSON.stringify({"id": product_id,"image": product.image, "name": product.name, "description": product.description,
            "ram": product.ram, "storage": product.storage, "operatingSystem": product.operatingSystem})})
        
        const json = await response.json()
        
        if(json.status){
            props.showAlert(json.message, "success")
        }
        else{
            props.showAlert(json.message, "danger")
        }
    }

    const deleteProduct = async (productId) =>{
        const response = await fetch(`${window.base_url}`)
    }

    return (
        <ProductContext.Provider value={{product, setProduct, fetchProducts, addProduct, editProduct, deleteProduct}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;