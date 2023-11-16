import React, { useContext } from 'react'
import productContext from '../context/product/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'


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
  const [hover, setHover] = useState(false)

const sectionStyle = {
  color: hover ? "red" : "black",
  // padding: hover ? Metrics.spacing.inside : undefined,
};

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
                    <Link to='/productDetails' style={sectionStyle} onClick={onClickDetails} onMouseEnter={() => setHover(true)}x onMouseLeave={() => setHover(false)} className="card-title">{props.name}</Link>
                        <p className="card-text my-2">{props.description.length > 85? `${props.description.slice(0,85)}...`: props.description}</p>
                        <div>
                          
                      {props.aggregatedRating>0.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>1.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>2.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>3.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>4.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      <p className="ml-2">{`${props.aggregatedRating} (${props.count})`}</p> 
                      </div>
                        <p className="card-text">Price:- {props.price?.toLocaleString("en-US")}</p>
                        <Link to='/productDetails'  onClick={onClickDetails} className="btn btn-sm btn-dark">Details</Link>
                        <i className="fas fa-edit my-2 mx-2" onClick={onEditClick}></i> 
                        <i className="fa-solid fa-trash-arrow-up my-2 mx-2" onClick={onClickDelete}></i>
                    </div>
                </div>
            </div>
    </>
  )
}
