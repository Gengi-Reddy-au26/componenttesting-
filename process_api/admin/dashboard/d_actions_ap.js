import { supabase } from '../../../util/supabaseClient'
//import NotificationAction from '../com/notification/action'
import _ from 'lodash'

import {adminCollabs, adminCollabRequests, adminProducts} from './d_a_c_get_ap'
import action_collab from './d_a_collab_ap'
import action_product from './d_a_product_ap'
import action_onboarding from './d_a_onboarding_ap'

//import { typeImages, get_image} from '../get/image'

export default async function  process(props) { 
  let {admin_action, action, id, type, type_id, meta, result}=props 
  let data={}  

  console.log("props", props) 
  
  if(admin_action=='get_actions'){ 

    let res = await supabase
    .from('admin_action')
    .select()    
    .order('created_at', { ascending: false }) 
    data=res.data
    data=await adminCollabRequests(data)
    data=await adminCollabs(data)
    data=await adminProducts(data)
    
    

  }else if(admin_action == 'add_action'){
    let del_req = await supabase
    .from('admin_action')
    .delete() 
    .eq('action', action)  
    .eq('type', type)  
    .eq('type_id', type_id)

    let req = await supabase
    .from('admin_action')
    .insert([
      {action, type, type_id, meta},
    ])   
  }else if(type=='collab'){ 
    data=await action_collab(props)  

  }else if(type=='product'){ 
    data=await action_product(props)  

  }else if(type=='onboarding'){ 
    data=await action_onboarding(props)  

  }

  if(data.action_status=="done"){
    let res = await supabase
    .from('admin_action')
    .update([{status:data.action_status, result}])
    .eq('id', id)
    data['admin_action']=res.data[0] ? res.data[0] : {}
  }

  //console.log("Dashboard "+action, data)
  return data
}
