import React, { useState } from "react";
import ProductContext from "./ProductContext";
import { json } from "react-router-dom";

const ProductState = (props)=>{
    const productInitial = {}
    const [product, setProduct] = useState(productInitial)

    const fetchProducts = async () => {
        const response = await fetch(`${window.base_url}/products/list-products`,
        {method:"POST", headers:{"Content-Type":"application/json", "token": localStorage.getItem('token')},
        body: JSON.stringify({})})
        const json = await response.json()
        if(json.status){
            props.showAlert(json.message, "success")
        }
        else{
            props.showAlert(json.message, "danger")
        }
    return json    
    }
    
    const addProduct = async (productImage) => {
        console.log(product)
        const response = await fetch(`${window.base_url}/products/add-product`, {
            method: 'POST',
            headers: {"Content-Type":"application/json", "token": localStorage.getItem('token')},
            body: JSON.stringify({"image": productImage, "name": product.name, "description": product.description,
            "ram": product.ram, "storage": product.storage, "operatingSystem": product.operatingSystem, "price": product.price})})
        const json = await response.json()

        if(json.status){
            props.showAlert(json.message, "success")
        }
        else{
            props.showAlert(json.message, "danger")
        }
    }
    
    const updateProduct = async (product_id, productImage) => {
        const response = await fetch(`${window.base_url}/products/edit-product`, {
            method: 'PUT',
            headers: {"Content-Type":"application/json", "token": localStorage.getItem('token')},
            body: JSON.stringify({"image": productImage, "name": product.name, "description": product.description,
            "ram": product.ram, "storage": product.storage, "operatingSystem": product.operatingSystem, "price": product.price,
        "productId": product_id})})
        
        const json = await response.json()
        
        if(json.status){
            props.showAlert(json.message, "success")
        }
        else{
            props.showAlert(json.message, "danger")
        }
    }

    const deleteProduct = async (product_id) =>{
        const response = await fetch(`${window.base_url}/products/delete-product?productId=${product_id}`,{
            method: 'DELETE',
            headers: {"Content-Type":"application/json", "token": localStorage.getItem('token')},
            // body: JSON.stringify({"productId": product_id})
        })
        const json = await response.json()
        if(json.status){
            props.showAlert(json.message, "success")
        }
        else{
            props.showAlert(json.message, "danger")
        }
    }

    return (
        <ProductContext.Provider value={{product, setProduct, fetchProducts, addProduct, updateProduct, deleteProduct}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;