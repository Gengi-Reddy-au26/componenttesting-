import React, { useState, useEffect} from 'react';
import ReactSlider from 'react-input-slider';
import User from '../../blocks/com/user';
import Button from '../../button';
import {get_thumb_src, Thumb} from '../../get/image';

import _ from 'lodash'




import s from './ui.module.scss';

const CONSTANTS={
  test:1,  
}

const get_id=(i)=>{
  return(
    <div className={s.id}>
      <div className={s.id_+' font-able'}><span>{i.id}</span></div>     
    </div>
  )
}
const WeightSlider = (props) => {
  let {label, onChange, x}=props
  //console.log("slider", props)
  const changeHandler = (o) => {
    //console.log("slider", o) 
    o.x=Math.round(o.x * 100)/100 
    o.y=Math.round(o.y * 100)/100   
    onChange(o)
  }  
  return (
    <div className={s.slider+' flex items-center'}>
      {label && <div className={s.label+' mr-2'}>{label}</div>}   
      <div className={"mr-2"}><ReactSlider  {...{props}}  xmax={1} xstep={0.1} x={x} onChange={changeHandler}/></div> 
      <div className={s.value}>{x}</div>
    </div>
  )
}


const tag = ({label, size, color})=>{
  return(
    <div className={'text-center '+s.tag+' '+s[size]+' '+s[color]}>{label}</div>
  )
}

const percentage_tag = (value)=>{
  let color='grey'
  if(value >= 100){
    color='blue'
  }else if(value >= 50){
    color='green'
  }else if(value > 0){ 
    color='orange' 
  } 
  return tag({label:value+'%', size:'sm', color})
}


const collab_status_tag = ({content='', status, size})=>{  
  let label; let color
  if(!size) size='lg'
  if(status=="business_accepted"){
    label='Business Accepted'; color='gray'
  }else if(status=="influencer_accepted"){
    label='Influencer Accepted'; color='gray'
  }else if(status=="collaborate"){
    label='Collaborate'; color='yellow'
  }else if(status=="init_payment"){
    label='Init Payment'; 
  }else if(status=="live"){
    label='Live';  color='blue'
  }else if(status=="init_payment_paid"){
    label='Init Payment Paid'; color='orange'
  }else if(status=="completed"){
    label='Promotion Completed'; color='blue'
  }else if(status=="paid"){
    label='Paid'; color='green'
  }else{
    label=status; 
  }
  if(content!='') label=content
  
  return tag({label, size, color})
}
const collab_main_status_tag= (i) => {
  return (
    <div className={s.status+' text-center'}>
      {tag({label:i.status == 'paid' ? 'Completed' : 'Active', size:'sm', color:i.status == 'paid' ? 'green' : 'blue'})}
    </div>
  )  
}

const get_order_status= (i) => {
  let {status} = i
  let label, color
  status = status ? status : 'awaiting_processing'
  if(status=="order"){
    label='Order'; color='gray'
  }else if(status=="awaiting_processing"){
    label='Awaiting Processing'; color='light_blue'
  }else if(status=="processing"){
    label='Processing'; color='blue'
  }else if(status=="payment_received"){
    label='Payment Received'; color='yellow'
  }else if(status=="shipped"){
    label='Shipped';   color='purple'
  }else if(status=="cancelled"){
    label='Cancelled';   color='red'
  }else if(status=="completed"){
    label='Completed'; color='green'
  }else if(status=="active"){
    label='Active'; color='blue'
  }else if(status=="delivered"){
    label='Delivered'; color='green'
  }else{
    label=status; 
  }  
  //console.log("tag", i, {label, color})
  return {status, label, color}
}
const order_status_tag = ({content='', status, size})=>{
  let {label, color} = get_order_status({status})  
  
  if(content!='') label=content
  if(!size) size='lg'    
  return tag({label, size, color})
}
const order_main_status_tag= (status) => {
  let content_= status == 'completed' ? 'Completed' : 'Active'  
  return (
    <div className={s.status+' text-center'}>
      {tag({label:content_, size:'sm', color:status == 'completed' ? 'green' : 'blue'})}
    </div>
  )  
}


const dot = ({level, status, levels}) =>{
  let c_
  if(levels[status]>=level) c_+= ' '+s.active
  return(
    <div className={s.dot+' '+c_}></div>
  )
}
const dot_gradient = ({status, levels}) => {
  let gradient_from=(levels[status]/9)*100
  let gradient_to=gradient_from+10
  if(gradient_to>100) gradient_to=100
  
  let green='rgba(2, 195,21, 0.1)'
  let gray='rgba(0, 0, 0, 0.05)'   
  let gradient=`to right, ${green} 0%, ${green} ${gradient_from}%, ${gray} ${gradient_to}%, ${gray} 100%`;
  return gradient
}

let Instagram = ({instagram_url, className})=>{
    if(instagram_url){
      return(
        <Button className={className} type="default" target="_blank" to={instagram_url}> <img src={"/images/Instagram.svg"}/></Button>
      )
    }else{
      return(
        <Button className={className+" opacity-50"} type="default" target="_blank"> <img src={"/images/Instagram.svg"}/></Button>
      )
    }
  }
let Facebook = ({facebook_url, className})=>{
  if(facebook_url){
    return(
      <Button className={className} type="default" target="_blank" to={facebook_url}> <img src={"/images/Facebook.svg"}/></Button>
    )
  }else{
    return(
      <Button className={className+" opacity-50"} type="default" target="_blank"> <img src={"/images/Facebook.svg"}/></Button>
    )
  }
}
let Setting = ({settings_url})=>{
  if(settings_url){
    return(
      <Button className={''} type="default"  to={settings_url}> <img src={"/images/Setting_line_light.svg"}/></Button>
    )
  }else{
    return(
      <Button className={"opacity-50"} type="default" > <img src={"/images/Setting_line_light.svg"}/></Button>
    )
  }
}
let SM = ({facebook_url, instagram_url})=>{  
  return(
    <div className={"flex justify-center items-center"}>
      <Instagram {...{instagram_url}} className={"mr-1"}/>
      <Facebook {...{facebook_url}}/>
    </div>
  )
}
let Refresh = ({className, handler})=>{  
  return(
    <Button className={className} type="default"  clickHandler={handler}> <img src={"/images/Refresh_light.svg"}/></Button>
  )
}



const Loading=(i)=>{
  let {value, isProcessing} = i
  let value_ = isProcessing == true  ? (<span><img src={"/images/loading.svg"}/></span>) : value
  return value_
}

const ApproveReject = ({approveH=false, rejectH=false}) =>{ 
  const [isP, setP] = useState(false)
  let approve_, reject_, gap_
  const approveH2 = async() =>{
    setP(true)  
    if(approveH!=false) await approveH()   
    setP(false)
  } 
  const rejectH2 = async() =>{
    setP(true)   
    if(rejectH!=false) await rejectH() 
    setP(false)
  } 
  if(approveH){
    approve_=(<div className={"flex flex-col items-center"}>
        <Button type="default"  clickHandler={approveH2}><img src={"/images/Done_round_green.svg"}/></Button>
        <div className={"text-xs opacity-50"}>Approve</div>
      </div>)
  }  
  if(rejectH){
    reject_=(<div className={"flex flex-col items-center"}>
        <Button type="default"  clickHandler={rejectH2}><img src={"/images/Close_square_red.svg"}/></Button>
        <div className={"text-xs opacity-50"}>Reject</div>
      </div>)
  } 
  if(approveH && rejectH) gap_=(<div className={"mr-4"}></div>)
  let content_=(
    <div className={' flex items-center'}>
      {rejectH && reject_}  
      {gap_}          
      {approveH && approve_} 
    </div>
  )
  content_ = <Loading {...{value:(<span>{content_}</span>), isProcessing:isP}}/>   
  return(
    <div className={'mb-4'}>
        {content_}    
    </div>
  )
} 



export {  
  get_thumb_src,
  Thumb,
  User,
  get_id,
  dot,
  dot_gradient,
  tag,
  percentage_tag,
  order_status_tag,
  collab_status_tag,
  collab_main_status_tag,
  
  get_order_status,
  order_main_status_tag,
  WeightSlider ,
  Instagram,
  Facebook,
  Setting,
  SM,
  Refresh,
  ApproveReject,
  Loading
}
