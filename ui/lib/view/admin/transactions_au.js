import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { PAGE_DATA_SET } from "/store/types";
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import User from '../../blocks/com/user';
import TabSwitch from '../../tab_switch'; 
import TransactionsSearch from './search/transactions_search'
import {extract_items} from '../../../../components/get/search';
import { usePage } from "../../hooks/usePage";

import s from './transactions_au.module.scss';
import Moment from 'moment';
import _ from 'lodash'



const com = ({handler, getData,  ...props}) => { 

  const dispatch = useDispatch();  
  const {data} = useSelector((state) => state.pageData); 

  useEffect(async () => { 
    let isMounted = true    
    let data = await getData() 
    if(isMounted) setData((prev)=>data)
    return () => {
      isMounted = false;
    };
  }, []); 
  
  
  //STATES 
  
  const [isData, setData]= useState([]) 
  const [isType, setType] = useState('order')
  const [isLoading, setLoading] = useState(false)
  const [isProcess, setProcess] = useState('')

  const refresh= async()=>{
    let data = await getData() 
    setData((prev)=>data) 
    setProcess("") 
  }
  const view= async(i)=>{
    //setProcess("view")
    await handler({action:"view", ...i})
    //refresh()    
  }
  const decline= async(i)=>{
    //setProcess("reject")
    await handler({action:"decline", ...i})   
    //refresh()      
  }

  const processing=(action)=>{
    return action==isProcess ? true : false
  }

  // HANDLERS  
  const Headings=()=>{    
    return(
      <div className={s.headings}>
        <div className={s.id_a}>{isType=='order' ? 'Order':'Collab'}</div> 
        <div className={s.name_a}>Influencer</div>
        <div className={s.mode_a}>Mode</div>        
        <div className={s.total_a}>Total</div> 
        <div className={s.action_a}></div>   
      </div>
    )
  }
  const CollabItem=(i)=>{
    const {collab, business, product, mode, meta}=i
    if(!collab) return(<div></div>)
    return(
      <div className={s.item}>
        <div className={s.id_a}>
          <div className={s.id}>{collab.id}</div>          
        </div> 
        <div className={s.name_a}>
          <User className={"mr-2"} {...collab.influencer} size="sm" />
          <h6 className={s.name}>{collab.influencer.name}</h6>
        </div>
        <div className={s.mode_a}>{mode?.label}</div>
        <div className={s.total_a}>{meta?.amount} Rs.</div>
        <div  className={s.action_a+' flex flex-col items-end'}>
          <div className="mb-2 opacity-50">{Moment(i.created_at).format('MMMM Do YYYY, h:mm a')}</div>
          <div className={"flex items-center"}>            
            <Button isProcessing={processing("view")} type="action2" color="blue" clickHandler={()=>view(i)}>View</Button>
          </div> 
        </div>      
      </div>
    )
  }
  const OrderItem=(i)=>{
    const {order, business, product, mode, meta}=i
    if(!order) return(<div></div>)
    return(
      <div className={s.item}>
        <div className={s.id_a}>
          <div className={s.id}>{order.id}</div>          
        </div>         
        <div className={s.name_a}>
          <User className={"mr-2"} {...order.influencer} size="sm" />
          <h6 className={s.name}>{order.influencer.name}</h6>
        </div>    
        <div className={s.mode_a}>{mode.label}</div>            
        <div className={s.total_a}>{meta.total} Rs.</div> 
        <div  className={s.action_a+' flex flex-col items-end'}>
          <div className="mb-2 opacity-50">{Moment(i.created_at).format('MMMM Do YYYY, h:mm a')}</div>
          <div className={"flex items-center"}>
            <Button isProcessing={processing("view")} type="action2" color="blue" clickHandler={()=>view(i)}>View</Button>
          </div> 
        </div>      
      </div>
    )
  }
  let items_
  if(isData.length) {
    items_=isData.map((i, index)=>{
      if(isType=="order"){}
      return(
        <div>
          {(!isLoading && isType=="order") && <OrderItem key={index} {...i}/>}
          {(!isLoading && isType=="collab") && <CollabItem key={index} {...i}/>}
        </div>
      )
    })
  }

  const type_opt={
    items:[
      {label:'Collabs', name:'collab', isActive:isType == 'collab' ? true : false},
      {label:'Orders', name:'order', isActive:isType == 'order' ? true : false}
    ],
    handler: async(i) =>{
      //console.log(i)
      setLoading(true)
      setType( prev => i.name )      
      let data = await getData({type:i.name}) 
      setData((prev)=>data) 
      setLoading(false) 
    }
  }  

  const updateHandler = async (i) => {    
    i=extract_items(i, [
      {find:'collab_status', get:'collab_status', get_type:'object'},
      {find:'business', get:'business_name', get_type:'string'},
      {find:'business_id', get:'business_id', get_type:'string'},
      {find:'influencer', get:'influencer_name', get_type:'string'},
      {find:'influencer_id', get:'influencer_id', get_type:'string'},
      {find:'product', get:'product_name', get_type:'string'},
      {find:'product_id', get:'product_id', get_type:'string'}
    ]) 
    console.log("i", i)
    let data = await getData(i) 
    setData((prev)=>data)  
  }  
  const collab_status_options=[
    {label:'All', value:''},    
    {label:'Pending', value:'pending'},  
    {label:'Declined', value:'declined'}, 
    {label:'Approved', value:'approved'},   
  ]
  return (
    
    <Layout {...props} showFooter={false} showShopNav={false}> 
      <div className={s.main}>        
        <h3 className={"mb-4"}>Transactions</h3>
        <div className={"flex items-center mb-4"}><TabSwitch {...type_opt}/></div>      
        <TransactionsSearch {...{collab_status_options, updateHandler}}/>
        <div className={s.content}>
          <Headings/>
          {items_}
        </div>  
      </div> 
    </Layout>    
  )
}
export default com
