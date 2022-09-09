import React, { useState , useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CART_SET } from "/store/types";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import s from './index.module.scss';




const com = ({viewType}) => { 
  const cartData = useSelector((state) => state.cartData);
  const { fasty } = cartData;  
  //console.log("nav cart", cartData)
  let c_=''
  let totalItems=0
  if(cartData.items && cartData.items.length){
    _.forEach(cartData.items, function(item){
      //console.log("item2", item)
      if(item) totalItems+=parseInt(item.qty)
    })
  }  
    
  return (
    <Link  href="/app/cart/">
      <a className={s.main}>
        <img src="/images/Bag_alt.svg"/>
        {totalItems!=0 && <div className={s.totalItems}>{totalItems}</div>}
      </a>
    </Link>    
  )
}


export default com