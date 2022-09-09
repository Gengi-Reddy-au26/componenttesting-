import { supabase } from '../../util/supabaseClient'
import axios from 'axios';

const add_click = async ({id, collab_id, clicks}) => {
    clicks++
    let res = await supabase
    .from('collab_short_url')
    .update([{clicks}]) 
    .eq("id", id)  

    let collab = await supabase
    .from('collab')
    .select(`performance_id`) 
    .eq("id", collab_id)

    let cd= collab.data ? collab.data[0] : {}
    if( cd && cd.performance_id){
        let res = await supabase
        .from('collab_performance')
        .update([{click_through:clicks}]) 
        .eq("id", cd.performance_id)   
    }      
}
export default async function  process(props) {  
    let {action, short_code} = props
    let data={}  
    //console.log("data props "+action, props)  
    if(action=='get'){  
        let res = await supabase
        .from('collab_short_url')
        .select(`*`) 
        .eq("short_code", short_code)
        //console.log("data res "+action, res)  
        data=res.data ? res.data[0] : {}
        if(data && data.id) add_click(data)        
    }

    console.log("data "+action, data)  
    return data
}
