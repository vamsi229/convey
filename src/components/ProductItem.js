import React, { useContext } from 'react'
import productContext from '../context/product/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import Product from './Product'

export default function ProductItem(props) {
  const pContext = useContext(productContext)
  const {product, setProduct, fetchProducts, deleteProduct} = pContext
  const history = useNavigate();
  const onEditClick = ()=>{
    setProduct({name: props.name, image: props.image, description: props.description, ram: props.ram, 
      storage: props.storage, operatingSystem: props.operatingSystem, productId: props.productId, price: props.price})
    history("/editProduct")
  }
  const onClickDetails = ()=>{
    setProduct({name: props.name, image: props.image, description: props.description, ram: props.ram, 
      storage: props.storage, operatingSystem: props.operatingSystem, productId: props.productId, price: props.price})
  }

  const onClickDelete = ()=>{    
    deleteProduct(props.productId)
    window.location.reload();
    // history("/")
    // history("/products")
    
  }

  return (
    <>
    <div className="my-3">
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>
                    </div>
                    <img src={props.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Product Name:- {props.name}  </h5>
                        <p className="card-text">Description:- {props.description}</p>
                        <p className="card-text">Price:- {props.price}</p>
                        <Link to='/productDetails'  onClick={onClickDetails} className="btn btn-sm btn-dark">Details</Link>
                        <i className="fas fa-edit my-2 mx-2" onClick={onEditClick}></i> 
                        <i className="fa-solid fa-trash-arrow-up my-2 mx-2" onClick={onClickDelete}></i>
                    </div>
                </div>
            </div>
    </>
  )
}
