import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from './layout';
import Title from '../../title';
import Button from '../../button';
import User from '../../blocks/com/user';
import Sm from '../../blocks/com/sm';


import s from './profile.module.scss';


const com = ({item, collabs, ...props}) => {
  let user=props.user 
  /*console.log('user2', user)
  console.log('profile2', item)
  console.log('collabs2', collabs)
  console.log('props', props)*/
  //const collabs_=123
  //console.log('profile2', item)
  const collabs_=collabs.map(({id, business}, index)=>{
    return(
      <Link key={index} href={"/app/collab/"+id}>
      <div className={s.collab} >
        <div className={s.inner}>
          <div><User {...business} size="md"/></div>
          <div className={s.name}>{business.name}</div>
        </div>
      </div>
      </Link>
    )
  })

  
  props.navArgs.translucent=false 
  props.navArgs.noborder=false 
  return (
    <Layout {...props} showShopNav={false}> 
      <div className={s.main}>
        <div className={s.inner+' w-full'}>

          <div className={s.head+' flex flex-wrap items-center md:flex-nowrap py-12'}>
            <div className={s.left+' w-full md:w-auto'}>
              <div className={s.user}><User {...user} size="block"/></div>            
            </div>
            <div className={s.right+' w-full md:w-auto flex-grow pl-12'}>
              <div className="flex items-center">
                <h3>{item?.name}</h3>
                <Link href="/app/settings"><div className={s.settings+' ml-6 w-8'}><img src="/images/settings.png"/></div></Link>
              </div>
              <h5>{item?.profession}</h5>
              <div className="mt-6"><Sm {...item.influencer2_details}/></div>
              <div className={s.desc+' mt-6'}>{item.influencer2_details?.desc}</div>
            </div>
          </div>          
          <div className="py-6">
            <h3>Companies collaborated with</h3>
            <div className={s.collabs}>{collabs_}</div>
          </div>
        </div>
      </div>
    </Layout>    
  )
}
export default com
