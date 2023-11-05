import React, { useContext } from 'react'
import productContext from '../context/product/ProductContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Product() {
  const pContext = useContext(productContext)
  const {product, updateProduct, deleteProduct} = pContext
  const history = useNavigate();
  const onEditClick = ()=>{
    history("/editProduct")
  }

  return (
    <>
    <Link className="btn btn-primary mx-1 my-4" to="/addProduct" role="button">+ New Product</Link>
    <div className="card" style={{width: '18rem'}}>
  <img src="https://st3.depositphotos.com/24218558/33465/i/1600/depositphotos_334652704-stock-photo-valentines-day-creative-concept-flatlay.jpg" className="card-img-top" alt="..." width="100rem" length ="100rem"/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="/showDetails" className="btn btn-primary">details</a>
    <i class="fas fa-edit my-2 mx-2" onClick={onEditClick}></i> 
    <i class="fa-solid fa-trash-arrow-up my-2 mx-2" onClick={()=>{deleteProduct(product.productId)}}></i>

  </div>
</div>
    </>
  )
}
