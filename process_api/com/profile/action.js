import { supabase } from '../../../util/supabaseClient'

import { get_image, get_product_prices, productImages} from '../../get/product'

import axios from 'axios';

export default async function  process({action, name, influencer_id, business_id, data, meta, image_id, details, details_id}) {  
  let data2={}  
  console.log("data in", data)

   

  if(action=='update_meta'){  
    let user = await supabase
    .from('influencer2')
    .update([{meta:meta}]) 
    .eq("id", influencer_id)
    data2=user.data[0]
    //console.log("User", user)

  }else if(action=='get_influencer'){  
    let user = await supabase
    .from('influencer2')
    .select(`
    *,
    influencer2_details:details_id (*)
    `) 
    .eq("id", influencer_id)
    data2=user.data[0]
    //console.log("User", user)

  }else if(action=='get_collabs'){  
    let collab = await supabase
    .from('collab')
    .select(`
    *,
    business(*)
    `) 
    .eq("influencer_id", influencer_id)
    data2=collab.data
    console.log("collab", collab)

  }else if(action=='get_business'){  
    let user = await supabase
    .from('business')
    .select(`
    *,
    details:details_id (*)
    `) 
    .eq("id", business_id)
    data2=user.data[0]
    data2.image=await get_image(data2)
    console.log("User", user)

  }else if(action=='get_business_products'){  
    let products = await supabase
    .from('product')
    .select(`
    *
    `) 
    .eq("business_id", business_id)
    data2=products.data
    data2=get_product_prices(data2)
    data2 =await productImages(data2)
    //console.log("products", data2)

  } else if(action=='get_business_collabs'){  
    let collab = await supabase
    .from('collab')
    .select(`
    *,
    influencer2(*)
    `) 
    .eq("business_id", business_id)
    data2=collab.data
    console.log("collab", collab)

  }else if(action=='update_influencer'){ 

    if(data.meta.accessToken){
      const fb2 = await axios({       
        url: "https://graph.facebook.com/v14.0/me/accounts?access_token=" + data.meta.accessToken,
        //url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&access_token=" + data.meta.accessToken,
        
        method: "get",
      });

      if(fb2.data) data.meta.long_accessToken=fb2.data.data[0].access_token
      //console.log("fb2",  fb2.data.data[0].access_token)
    }

    let update = await supabase
    .from('influencer2')
    .update([data]) 
    .eq("id", influencer_id)
    //data2=update.data
    console.log("update", update)

    let update2 = await supabase
    .from('influencer2_details')
    .update(details) 
    .eq("id", details.id)
    //data2=update.data
    console.log("details", update2)
    data2=update.data[0]
    
    
    /*
    const fb3 = await axios({       
      //url: "https://graph.facebook.com/v14.0/me/accounts?access_token=" + data.meta.accessToken,
      url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&access_token=" + fb2.data.data[0].access_token,
      
      method: "get",
    });
    console.log("fb3", fb3.data)*/

  } else if(action=='update_business'){ 
   
    let update = await supabase
    .from('business')
    .update([{name, image_id, meta}]) 
    .eq("id", business_id)
    //data2=update.data
    console.log("update", update)

    data2=update.data[0]

    if(details.id && details){ 
      let {desc} = details    
      let update2 = await supabase
      .from('business_details')
      .update({desc}) 
      .eq("id", details.id)
      //data2=update.data
      console.log("details", update2)      
    }
   

    
    
    
    /*
    const fb3 = await axios({       
      //url: "https://graph.facebook.com/v14.0/me/accounts?access_token=" + data.meta.accessToken,
      url: "https://graph.facebook.com/v14.0/oauth/client_code?client_id=1194804817999553&client_secret=cd8e036889b13ccc7013f7de5b37f215&access_token=" + fb2.data.data[0].access_token,
      
      method: "get",
    });
    console.log("fb3", fb3.data)*/

  }   
  console.log("data "+action, data2)  
  return data2
}
