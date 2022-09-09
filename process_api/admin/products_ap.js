import { supabase } from '../../util/supabaseClient'
import NotificationAction from '../com/notification/action'
import _ from 'lodash'

export default async function  process(props) { 
  let {action, id }=props
  let data={}

  console.log("props", props)

  if(action=='update_approve'){  

    let res = await supabase
    .from('product')
    .update([{status:'published'}]) 
    .eq("id", id)   
    data=res.data[0]  

  }else if(action=='update_reject'){  
    let res = await supabase
    .from('product')
    .update([{status:'rejected'}]) 
    .eq("id", id)   
    data=res.data[0]  

  }
  
  console.log("Products Requests "+action, data)
  return data
}
