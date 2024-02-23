import React, {useEffect, useRef, useState} from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { foodItem } from 'react';

export default function Card (props){
  let dispatch = useDispatchCart();
  let data=useCart();
  let priceRef=useRef();
  let options = props.options;
  let priceOptions =Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  
   const handleAddToCart = async()=>{
    let food = []
    for (const item of data) {
      if(item.id===props.foodItem._id){
        food = item;

        break;
      }
    }
    
    if (foodItem && foodItem.length > 0){
      if (food.size === size){
        await dispatch({type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty})
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty: qty,size:size,img: props.foodItem.img });
        return 
        // await console.log(data)
      }
      return
    }
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty: qty,size:size,img: props.foodItem.img});
    
   }
 
   let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  //  totval += finalPrice;
  //  console.log(totval);
 useEffect(()=>{
  setSize(priceRef.current.value)
 },[])
  return (
    <div>
         <div><div className="card mt-3" style={{width: "16rem",maxHeight : "360px"}}>
  <img src={props.foodItem.img} alt="..." style={{height:"120px",objectFit:"fill"}}/>
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>
    <p className="card-text ">This is some important text.</p>
    <div className='container w-100'>
      <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
       { Array.from(Array(6), (e,i)=>{
         return(
          <option key={i+1} value={i+1}> {i+1} </option>
         )
       })}
      </select>
      <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
      {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
      </select>
      <div className='d-inline h-100 fs-5'>
         ₹{finalPrice}/-
      </div>
      <hr>
      </hr>
      <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
    </div>
  </div> 
  </div>
  </div>
</div>
  )
}
