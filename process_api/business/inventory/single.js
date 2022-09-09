import { supabase } from '../../../util/supabaseClient'
//import getInfluencer from '../get/influencer'
//import getBusiness from '../get/business'

import {get_image, typeImages} from '../../get/image'
import { getDiscountedPrice } from '../../get/order'




export default async function  process({id, business_id}) { 
  let data={}
  let product = await supabase
  .from('product')
  .select()
  .eq('id', id)

  let campaign = await supabase
  .from('product__campaign')
  .select()
  .eq('product_id', id)

  let extra = await supabase
  .from('product__extra')
  .select()
  .eq('product_id', id)

  if(product.data){
    data.product=product.data[0]    
  }
  if(campaign.data && campaign.data[0]){
    data.campaign=campaign.data[0].meta 
  }  
  if(extra.data && extra.data[0] ){
    data.extra=extra.data[0] 
    if(data.extra.influencers) data.extra.influencers=await typeImages(data.extra.influencers)
  }    

  if(data.product && data.product.image_id){
     data.product.image=await get_image({image_id:data.product.image_id})
  }
  if(data.product){
    data.product.final_price=getDiscountedPrice(data.product.price, data.product.discount)   
  }
    
  
  //console.log("DATAT", data)

  return data
}
