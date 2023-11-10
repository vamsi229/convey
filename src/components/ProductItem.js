import React, { useContext } from 'react'
import productContext from '../context/product/ProductContext'
import { Link, useNavigate } from 'react-router-dom'


export default function ProductItem(props) {
  const pContext = useContext(productContext)
  const {setProduct, deleteProduct} = pContext
  const history = useNavigate();
  const onEditClick = ()=>{
    setProduct({name: props.name, image: props.image, description: props.description, ram: props.ram, 
      storage: props.storage, operatingSystem: props.operatingSystem, productId: props.productId, price: props.price,
      aggregatedRating: props.aggregatedRating})
    history("/editProduct")
  }
  const onClickDetails = ()=>{
    setProduct({name: props.name, image: props.image, description: props.description, ram: props.ram, 
      storage: props.storage, operatingSystem: props.operatingSystem, productId: props.productId, price: props.price,
      aggregatedRating: props.aggregatedRating})
  }

  const onClickDelete = ()=>{    
    deleteProduct(props.productId)
    window.location.reload();
    
  }

  return (
    <>
    <div className="my-2">
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>
                    </div>
                    <div>
                    <img src={props.image} height="500px" className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                    <Link to='/productDetails'  onClick={onClickDetails} className="card-title">{props.name}</Link>
                        <p className="card-text my-2">Description:- {props.description}</p>
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
