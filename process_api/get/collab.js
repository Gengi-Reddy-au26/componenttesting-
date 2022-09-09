import { supabase } from '../../util/supabaseClient'
import {treshold_amount, variable} from '../../ui/lib/view/admin/action';
import {get_commission_single} from './commission';
import { get_image} from './image'


const process_collab = async (i) => {
  i.processed=true
  i.influencer=i.influencer2

  i.percentage=await get_commission_single(i.business_id, 'platform_fee_collab', 'business')       
 
  i.treshold=i.influencer.influencer_treshold
  i.treshold_amount=treshold_amount(i)    
  i.variable=variable(i)
  i.init_fixed_fee=i.influencer.init_fixed_fee
  i.init_platform_fee =(i.percentage*i.init_fixed_fee)/100 
  i.total_init_payment=i.init_fixed_fee + i.init_platform_fee
  i.platform_fee = (i.percentage*(i.variable) )/100

  i.full_fee=i.init_fixed_fee + i.variable 

  i.balance_fee=i.variable  
  i.total_balance_fee=i.variable+i.platform_fee  

  i.total=i.init_fixed_fee + i.variable + i.platform_fee 

  i.can_go_upto = i.init_fixed_fee + i.treshold_amount  

  i.init_platform_fee_=(i.init_platform_fee+0).toFixed(2)
  i.platform_fee_=(i.platform_fee+0).toFixed(2)
  i.total_init_payment_=(i.total_init_payment+0).toFixed(2)
  i.total_=(i.total+0).toFixed(2)

  //console.log("process_collab", true)
  //console.log("process_collab percentage", i.percentage)
 // console.log("tresholds", tresholds )
  return i
}

const get_collab= async ({id})=>{
  let {data, error} = await supabase
  .from('collab')
  .select(`
  *,
  business(*),
  influencer2(
    *,
    influencer_treshold:treshold_id(*)
  ),
  product(*),
  collab_performance:performance_id(*)
  `)
  .eq('id', id)
  let out=await process_collab(data[0])

  if(out.id && out.id){
    let res = await supabase
    .from('collab_short_url')
    .select(`*`) 
    .eq("collab_id", out.id)
    let su=res.data? res.data[0] :{}
    
    if(su && su.id){
      out.share_url=su
    }
    if(out.meta && out.meta.performance_video_id) out.meta.performance_video=await get_image({image_id:out.meta.performance_video_id})
  }
  //console.log("process_collab2", true)
  
  return out
}
export {
  process_collab,
  get_collab
}
