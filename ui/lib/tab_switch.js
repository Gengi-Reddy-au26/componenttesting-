import React, { useState, useRef } from "react";
import s from './tab_switch.module.scss';

const com = ({items, size, active, handler}) => { 
  
  const switchHandler=(i)=>{
    handler(i)
  }
  const items_=items.map((i, index)=>{
    let active_
    if(active=='' && i.name==''){
      active_ = true 
    }else  if(active){
      active_ = i.name==active ? true : false    
    }else{
      active_ = i.isActive
    }
    //console.log("active", active, "name", i.name)
    return(
      <div key={index} className={ active_ ? s.active : ''} onClick={()=>switchHandler(i)}>{i.label}</div>
    )
  })
  let c_
  if(size=="md") c_+=' '+s.md

  return(
    <div className={s.switch+" flex justify-center "+ c_}>
      {items_}
    </div>
  )
}
export default com
