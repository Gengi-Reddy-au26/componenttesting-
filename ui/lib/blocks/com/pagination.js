import React, { useState , useEffect} from "react";
import Title from '../../title';
import Button from '../../button';
import s from './pagination.module.scss';

const com = (props) => { 
  let {isConfig, isFilter, setFilter, updateHandler} = props
  let {start, end} = isFilter  
  let {limit, total, result} = isConfig   
  let end_limit=limit

  //console.log("props", props)
  let c_=''
  const update = (i) => {
    setFilter(prev=>{
      let next={...prev, ...i}
      updateHandler(next)
      return next
    })
  }
  const prevHandler = () => {    
    if(isFilter.start > 1){
      let start=isFilter.start-limit
      let end=start+limit
      update({start, end})
    }   
  }
  const nextHandler = () => {
    if(isFilter.end <= total){
      let start=isFilter.start+limit
      let end=(start+limit) >= total ? (start+limit) : total
      update({start, end})
    }
  }
  let prev_
  let next_  
  if(start<=1) prev_=s.disabled
  if(end>=total) next_=s.disabled
  let end_= end
  if(end_>=total) end_=total
  if(start>=end_) start=0
  
  return(
    <div className={s.main+' flex items-center '+c_}>
      <div className={s.info+' flex items-center'}>
        <div className={s.value}>{start} - {end_}</div>
        <div className={s.label}>of</div>     
        <div className={s.value}>{total}</div>
      </div>
      <div className={s.prev+' '+s.btn+' '+prev_} onClick={prevHandler}><img src={"/images/Arrow_left_light.svg"}/></div>
      <div className={s.next+' '+s.btn+' '+next_} onClick={nextHandler}><img src={"/images/Arrow_right_light.svg"}/></div>
    </div>
  )
}
export default com