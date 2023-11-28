import React, { useContext } from 'react'
import productContext from '../context/product/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

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

    const [ratings, setRatings] = useState({"message":"", "status":"", "data":{}})
  
    const fetchProductRatings = async () => {
        // e.preventDefault();
        const response = await fetch(`${window.base_url}/products/product-rating`,
        {method:"POST", headers:{"Content-Type":"application/json", "token": localStorage.getItem('token')}, 
        body: JSON.stringify({productId: props.productId})});
        const json = await response.json();
        if (json.status){
          // localStorage.setItem('token', json.data.authToken)
          // history("/")
         
          setRatings(json)
        // props.showAlert(json.message, "success")

        }
        else{
          // props.showAlert(json.message, "danger")
        }
        
    }

const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    fetchProductRatings();
    if(event.currentTarget) setAnchorEl(event.currentTarget);
    console.log(ratings, 'sd')
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      ><div>
       {props.aggregatedRating>0.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>1.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>2.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>3.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      {props.aggregatedRating>4.5?<i className="fas fa-star"></i>:<i className="far fa-star"></i>}
                      <p className="ml-2">{`${props.aggregatedRating} (${props.count})`}</p> 
                      </div>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{<><p>1 Star:{ratings['data']['1']}</p>
        <p>2 Star:{ratings['data']['2']}</p>
        <p>3 Star:{ratings['data']['3']}</p>
        <p>4 Star:{ratings['data']['4']}</p>
        <p>5 Star:{ratings['data']['5']}</p></>}</Typography>
      </Popover>
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
