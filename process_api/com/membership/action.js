import { supabase } from '../../../util/supabaseClient'
import shortid from 'shortid'
import pw_action from '../pw/action'
import Moment from 'moment';


export default async function  process(props) {  
  let {action, action_2, user_id, user_type, plan, duration, level, meta} =props
  let data={}  
  console.log("props", props)
  if(action_2) delete props.action_2
  if(action_2=='create_temp_sub'){  
    let unique_id=shortid.generate()
    let pw = await pw_action({order_id:unique_id, amount:props.price, type:'sub'})

    let inData={...props}
    const temp = await supabase
      .from('temp')
      .insert([
        { shortid: unique_id, status:'pending', type:'sub', meta:inData},
      ]) 
    data=temp.data[0]
    data.total=props.price
    data.currency='INR'
    data.token=pw.txnToken
    data.pw=pw

    console.log("create_temp_collab", data)


  }else if(action_2=="get_temp_sub"){ 
    if(props.shortid){
      const temp = await supabase
        .from('temp')
        .select()
        .eq("shortid", props.shortid) 
      data=temp.data[0]    
      console.log("get_temp_collab", data) 
    }
    return data
    
  }else if(action=='new_membership'){ 
    let args
    let membership
    let res = await supabase
    .from('membership')
    .select() 
    .eq("user_id", user_id) 
    let start_date=new Date()
    let end_date= Moment(start_date).add(duration, 'M');

    if(res.data[0]){
      membership = await supabase
      .from('membership')
      .update([
        {status:'active', user_id, user_type, plan, duration, start_date, end_date, level, meta}
      ])
      .eq("user_id", user_id) 
    }else{
       membership = await supabase
      .from('membership')
      .insert([
        {status:'active', user_id, user_type, plan, duration, start_date, end_date, level, meta}
      ])     
    }
    data=membership.data[0] 
  }else if(action=='upgrade_membership'){  
    let start_date=new Date()
    let end_date= Moment(start_date).add(duration, 'M');
    let membership = await supabase
    .from('membership')
    .update([
      {status:'active', plan, duration, start_date, end_date, level, meta}
    ]) 
    .eq('user_id', user_id)

    data=membership.data[0] 
  }
  return data
}
