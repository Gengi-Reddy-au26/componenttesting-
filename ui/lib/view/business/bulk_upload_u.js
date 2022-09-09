import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";


import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import SalesSearch from './search/inventory_search'
import getStatus from '../../get/status';
import {get_image_src} from '../../get/product';
import {ThumbImage} from '../../blocks/ui/image_u';
import {checkPercentage} from '../../get/product';

import {Refresh} from '../_blocks/ui';

import s from './bulk_upload_u.module.scss';
import Moment from 'moment';

import * as XLSX from 'xlsx/xlsx.mjs';
import { read, utils, writeFileXLSX } from 'xlsx';



const com = (props) => {
  let {handler, upload_handler} = props
  console.log("Bulk Upload props", props) 

  const {user} = useSelector((state) => state.pageData);

  const [isData, setData] = useState([])  
  const [html, setHtml] = useState("");
  const [isFile, setFile] = useState(false);
  const refContainer = useRef(null);
  const tbl = useRef(null);

  const uploadToClient = async(event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]

      setFile(i)
      console.log("i", i)
      // const data = await i.arrayBuffer();     
      // const workbook = XLSX.read(data);
      // console.log(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
      // setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadToServer = async (event) => {
    
    const data = await isFile.arrayBuffer();     
    const workbook = XLSX.read(data);
    let products=XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    console.log("products", products)

    let res=await handler({action:'products_upload', products})      
    console.log("res", res)
    await refreshHandler()

  };
  const uploadToServer_bk = async (event) => {
    
    const body = new FormData();
    body.append("file", isFile);
    body.append("action", 'products_upload');
    body.append("business_id", user.id);
    console.log("body", body)
    let res=await upload_handler(body)
    if(res.meta && res.meta.public_path) {
      await read("https://localhost:3000"+res.meta.public_path)
    }   
    console.log("res", res)
    
  };

  useEffect(async()=>{
    await refreshHandler()
  }, [])
  
  const Item=(i)=>{
    let {sku, title, desc, price, discount, image_url, available_units, categories, status, meta} =i
    return(
      <div className={s.item+' flex items-center'}>
        <div>{sku}</div>
        <div>{title}</div>
        <div>{desc}</div>
        <div>{price}</div>
        <div>{discount}</div>
        <div>{image_url}</div>
        <div>{available_units}</div>
      </div>
    )
  }
  const render_products = ()=>{
    let ret=isData.map((i, index)=>{
      return (<Item key={index} {...i} />)
    })
    return ret
  }
  let content_=(<div>Loading...</div>)
  if(isData && isData.length){
    content_=render_products()
  }
  const refreshHandler=async()=>{
    let data=await handler({action:'get'})
    setData(data)
  }
 
  return (
    <Layout {...props} viewType="business_app"> 
      <div className={s.main}>
        <div className={s.inner}>
          <div className={s.header+" flex items-center mb-8"}>
            <div className={"flex-grow"}><input type="file"  onChange={uploadToClient} /></div>
            <div className={"flex items-center"}>
              <Button type="action2" clickHandler={uploadToServer}>Start Bulk Uploading</Button>
              <Refresh className={"ml-4"} handler={refreshHandler}/>
            </div>  
          </div>
          <div className={s.content+' flex-grow'}>  
            {content_}            
          </div>
        </div>
      </div>
    </Layout>    
  )
}
export default com
