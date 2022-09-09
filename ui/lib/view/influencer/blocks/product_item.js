import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import ProductStatus from './product_status';
import s from './product_item.module.scss';

import {get_thumb_src, get_size_600_src} from '../../../get/image';
import {get_image_src} from '../../../get/product';


const com = (props) => {   
  let {product}=props
  let {image, img }=product
  //console.log("product", product)
  
  let business_name=product.business ? product.business.name : ''
  //let src= get_image_src(product)
  if(img) img=img.replace("/products/", '')
  let src= get_size_600_src({...image, src:"/products/"+img})
  return(
    <div className={s.product}>
      <Link href={"/app/product/"+product.id}>
      <div className={s.p_inner+' relative flex flex-col justify-center items-center'}>
        <ProductStatus {...product}/>
        <div className={s.img_h+' w-full'}>
          <div className={s.img+' bg-center bg-cover'} style={{backgroundImage:'url("'+src+'")'}}></div>
        </div>
        <div className={s.title_a+' mt-2 flex items-center justify-center'} >
            <div className={s.title+' text-md md:text-xl text-center '} >{product.title}</div>
        </div>
        <div className={s.bottom_a+' w-full mt-2 flex '} >
            <div className={s.business_name+' flex-grow'} >{business_name}</div>
            <div className={s.price_a+' flex flex-col items-end'} >
            <div className={s.final_price+' '} >Rs. {product.final_price}</div>
            <div className={s.price} >Rs. {product.price}</div>
            </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
export default com
