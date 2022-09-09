import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'
import Title from '../../../title';
import Button from '../../../button';
import getStatus from '../../../get/status';
import s from './index.module.scss';
import _ from 'lodash'

import Checkout from '../../../view/_blocks/checkout';

const com = (props) => {
  let {items, isPW, meta_list, membership, chooseHandler, upgradeHandler} =props
  const {user} = useSelector((state) => state.pageData); 
  //console.log("isPW", isPW)
  let plan=''
  let items_=''
  let items2=[]
  //console.log("pageData", pageData)

  const [isDuration, setDuration] = useState('monthly')
  const [isData, setData]  = useState({label:'', name:'', duration:'', save:'', price:'', per_month:''})

  const process=(item)=>{
    let data={name:item.name, level:item.level, meta:item.meta}
    
    if(isDuration=="monthly"){
      data={...data, ...item.monthly, duration:1}
    }else{
      data={...data, ...item.yearly, duration:12}
    }
    //console.log("upgrade", data)
    return data
  }
  const chooseHandler2=(item)=>{
    let data=process(item)    
    chooseHandler(data)
  }
  const upgradeHandler2=(item)=>{
    let data=process(item)    
    upgradeHandler(data)
  }
  
  let points=[
    {for:'influencer', label:"Promotional requests", name:'promotional_requests', type:''},
    {for:'influencer', label:"Platform Fee", name:'platform_fee_order', type:'%'},
    {for:'influencer', label:"Success Fee (on total amount)", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Partnership fee", name:'platform_fee_collab', type:'%'},
    {for:'business', label:"Sales commission", name:'platform_fee_sale', type:'%'},    
  ]

  const Item=(item)=>{    
    //const {label, name, level,  points}=item
    const {title, name, level, points2, meta}=item
    const {months, duration, price, per_month, save} = isDuration=='monthly' ? item.monthly : item.yearly

    //console.log('plan item',item)
    const points_=meta_list.map((i, index)=>{
      if(i.for!=user.userType) return(<div  key={index}></div>)
      return(
        <li key={index} className={s.point}>{i.label} - {meta[i.name]}{i.type}</li>
      )
    })
    let action=(<Button className={s.button} type="action" width="full" clickHandler={()=>chooseHandler2(item)}>Choose</Button>)
    if(membership && membership.plan){
      if(membership.plan == name){          
        if(membership.status == 'expired'){   
          action=(<Button className={s.button} type="action" color="blue" width="full" clickHandler={()=>upgradeHandler2(item)}>Renew</Button>)
        }else {
          action=(<div className={s.subscribed}>Subscribed</div>)
        }
      }else if(membership.duration>duration){
        action=(<div className={s.downplan}></div>)
      }else if(level > membership.level){        
        action=(<Button className={s.button} type="action" width="full" clickHandler={()=>upgradeHandler2(item)}>Upgrade</Button>)
      } else{
        action=(<div></div>)
      }    
    }else{
      
    }
    if(price==0){
      action=(<div></div>)
    }
    return(
      <div className={s.item+' w-full md:w-4/12'}>
        <div className={s.item_inner}>
          <div className={s.top}>
            <h4>{title}</h4>
            <div className={s.membership}>Membership</div>
            <div className={s.price_a}>
              <div className={s.rs}>Rs</div>
              <h3 className={s.price}>{per_month}</h3>
              <div className={s.per}>/ per mo</div>
            </div>
            {save>0 && <div className={s.save}>Save {save} Rs</div>}
          </div>
          <ul className={s.points+ ' list-disc pl-6'}>
            {points_}
          </ul>          
          <div className={s.action}>{action}</div>
        </div>
      </div>
    )
  }
  
  if(items){
   items2=[]
    _.forEach(items, (value, key)=>{
       value.level=key.replace("level",'')
       //console.log("key", key)
       //console.log("value", value)
       //items_+=(<Item key={key} {...value}/>)
       items2.push(value)
    })
    items_=items2.map((i, index)=>{      
      return (<Item key={index} {...i}/>)
    })
  }
  const Switch=()=>{
    const switchHandler=(duration)=>{     
      setDuration((prev)=>{
        let next = duration
        //console.log("duration", next)
        return next
      })
    }
    return (
      <div className={s.switch+" flex justify-center"}>
        <div className={isDuration=="monthly" ? s.active : ''} onClick={()=>switchHandler("monthly")}>Monthly</div>
        <div className={isDuration=="yearly" ? s.active : ''} onClick={()=>switchHandler("yearly")}>Yearly</div>
      </div>
    )
  }
  return (
    <div className={s.main}>
      <Switch/>
      <div className={s.items+' flex flex-wrap'}>      
        {items_}
      </div>
      <Checkout isPW={isPW}/>
    </div>  
  )
}
export default com
