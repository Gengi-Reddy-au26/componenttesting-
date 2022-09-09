import { supabase } from '../../../util/supabaseClient'
import fs from "fs";
import _ from 'lodash'
var XLSX = require("xlsx");

const get_products = ({products, business_id}) => {
  if(!products) return false 
  if(!products.length) return false
  const rows = products.map(row => {
    let {sku, title, desc, price, image_url, discount, available_units, categories, industry, age_group, gender, industry_w, age_group_w, gender_w} = row
    let meta={
      industry,
      age_group,
      gender,
      industry_w,
      age_group_w,
      gender_w
    }
    //const categories_ = categories.split(",");
    return({
      business_id,
      sku,
      title,
      desc,
      price,
      discount,
      image_url,
      available_units,
      categories,
      status:'new',
      meta
    });
  })
  console.log("rows", rows)
  return rows
}

export default async function  process(props) {
  let {action, business_id} = props
  let data={}
  console.log("props", props)

  if(action=='get'){      
    let res = await supabase
    .from('temp_product')
    .select(`*`)
    .eq('business_id',business_id)
    .order('created_at', { ascending: true })
    data=res.data  

  }else  if(action=='products_upload'){      
    let product_=get_products(props)
    if(product_){
       let res = await supabase
      .from('temp_product')
      .insert(product_)
      data=res.data 
    }   
  }
  if(action=='products_upload_bk'){   

    var wb = XLSX.readFile(uploaded_file.server_path);
    var json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
    console.log("wb ", wb)

    let meta={
      json,
      uploaded_file
    }

    let res = await supabase
    .from('bulk_product_upload')
    .insert([{business_id, meta, status:'pending'}])
    data=res.data ? res.data[0] : {}
  }
  console.log("data "+action, data)
  return data
}
