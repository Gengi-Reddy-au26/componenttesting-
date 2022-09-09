import { supabase } from '../../util/supabaseClient'
import {get_commission_single} from '../get/commission';
import { getDiscountValue } from '../get/order'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, id, items}=props 

  let data={}
  let total=0
  let sub_total=0

  console.log("cart props", props)
  
  items=_.filter(items, 'id')
  
  let items2=[]
  items2=items  
  if(action=='delete_item'){ 
    _.forEach(items2, (value, key)=>{
      if(value==null) return 
      if(value.id==id) return      
      items2[key]=value 
    })      
  }
  
  _.forEach(items2, (value, key)=>{
    if(value==null) return       
    let discount=getDiscountValue(value.price, value.discount)       
    sub_total+=(value.price-discount) * value.qty
    value.final_price_after_discount=(value.price-discount) * value.qty
    value.price_after_discount=(value.price) * value.qty
    value.discount_value= discount  * value.qty
    //discount+=getDiscountValue(value.price, value.discount) 
    items2[key]=value       
  })    
  console.log("items2",items2) 
  data.items=items  
  data.sub_total=sub_total  
 
  return data
}
