import React, { useContext, useEffect, useState } from 'react'
import productContext from '../context/product/ProductContext'
import { Link } from 'react-router-dom'
import ProductItem from './ProductItem'

export default function Product() {
  const pContext = useContext(productContext)
  const {fetchProducts, setProduct} = pContext
  const [values, setValues] = useState([])

  async function fetchData() {
    setValues(await fetchProducts().then(result => result?.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  useEffect(()=>{fetchData()
  console.log("called")},
   []);


  const unsetDetails = () =>{
    setProduct([])
  }

  return (
    <>
    <Link className="btn btn-primary mx-1 my-3" to="/addProduct" onClick={unsetDetails} role="button">+ New Product</Link>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>Products</h1>
            <div className="container">
            <div className="row">
                {values.map((element) => {
                    return <div className="col-md-4" key={element.productId}>
                        <ProductItem name={element.name} description={element.description}
                        price={element.price} ram={element.ram} storage={element.storage} 
                        operatingSystem={element.operatingSystem} image={element.image} productId = {element.productId}
                        aggregatedRating = {element.aggregatedRating} count = {element.count}
                        />
                    </div>
                })}
            </div>
            </div> 

    </>
  )
}
