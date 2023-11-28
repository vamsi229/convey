import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import productContext from '../context/product/ProductContext'

export default function StarRating() {
  const history = useNavigate();
  const pContext = useContext(productContext)
  const {updateRating} = pContext
  const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
      setRating(rate)
  
      // other logic
    }

    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = (value) => console.log('Leave', value)
    const onPointerMove = (value, index) => console.log(value, index)
    const location = useLocation()
    const data = location.state
    const [comments, setComments] = useState({"val": ""})

    const onChangehandled = (e)=>{
      setComments({...comments, [e.target.name]: e.target.value.toString()})
    }
    const onSubmit = (e) => {
      e.preventDefault();
      const data1 = {"rate": rating, "productId": data.productId, "comments": comments.val}
      updateRating(data1)
      history("/products")

    }
    return (
    <div className="container">

        <form onSubmit={onSubmit}>
        {/* <h1>{location.state}</h1> */}
      <Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
      />
      <div className="mb-3">
    <label htmlFor="comment" className="form-label">Comments</label>
    <input type="text" className="form-control" value = {comments.val} onChange={onChangehandled}  id="val" name="val"
     required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
