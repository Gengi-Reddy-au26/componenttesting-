import { supabase } from '../../util/supabaseClient'

import { get_image, productImages } from './image'
import { getDiscountedPrice } from './order'
import _ from 'lodash'

export default async function process(data) { 
  let product = await supabase
  .from('product')
  .select()
  .eq("id", data.product_id)
  data.product=product.data ? product.data[0] : {title:'', img:''}
  //console.log(business)
  return data
}

const get_product_image = ({img, image_id, image}) =>{
  let src=''
  if(image_id!=''){
    let image=get_image({img, image_id, image})    
  }else{
    src=img
  }
  return src
}

const get_product_prices = (items) =>{
  if(items){
    _.forEach(items, (v, k)=>{      
      v.final_price=getDiscountedPrice(v.price, v.discount) 
    }) 
  }
  return items
}

export {
  get_image,
  get_product_image,
  get_product_prices,
  productImages,
}
