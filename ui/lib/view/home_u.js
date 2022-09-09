import React, { useState } from "react";
import { useRouter } from 'next/router';
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import TestUser from '../blocks/com/test_user';
import {LogoutBtn} from '../blocks/com/supertoken';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

import { useDispatch, useSelector } from "react-redux";


import s from './home_u.module.scss';
const com = ({cat, children,  ...props} ) => { 
  const router=useRouter()
  const {dev}=router.query
  //const session = useSessionContext()
  //console.log("session", session)

  const {user} = useSelector((state) => state.pageData);

  let guest_business_=(
    <div className="border-b-2 border-light-blue">
      <div className="mx-auto flex justify-center items-center py-24 py-24 md:py-36 px-6" style={{maxWidth:"1224px"}}>
        <div className="flex flex-col md:flex-row relative ">
          <div className="md:mt-16">
            <div className="text-4xl md:text-5xl font-bold mb-6 whitespace-nowrap">For Businesses</div>  
            <div className="mt-12 md:mt-48 md:ml-12 md:absolute top-0 left-0 z-10 text-xl">
              <div className={s.block+" bg-gradient-to-r from-light-yellow to-light-green p-6 md:p-12 rounded-4xl "}>
                Are you looking to <b>grow your sales</b> with <b>low customer acquisition costs</b>?
              </div>  
              <div className={s.block+" bg-gradient-to-r from-light-blue to-light-green  p-6 md:p-12 rounded-4xl mt-6 ml-12"}>
                Are you a wants to <b>increase your brand name</b> within your target market?
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:pl-12">
            <div className="flex flex-col items-end">
              <div className="mx-auto relative" style={{maxWidth:"100%"}}>                  
                <img src="/images/home_image_business.svg"/>                  
              </div> 
              <div className="relative mt-6 z-10"><Button to="/business"type="action">Know More...</Button></div>  
            </div>
          </div>
        </div> 
      </div> 
    </div>
  )
  let guest_influencer_=(
    <div className="">
      <div className="mx-auto flex justify-center items-center py-24 md:py-36 px-6" style={{maxWidth:"1224px"}}>
        <div className="flex flex-col md:flex-row relative ">
          <div className="md:mt-36">
            <div className="text-4xl md:text-5xl font-bold mb-6 whitespace-nowrap">For Influencers</div>  
            <div className="md:absolute bottom-0 left-0 z-10 mt-12 md:mt-0 mb-12 md:mb-24 md:ml-12 text-xl md:flex">
              <div className={s.block+" bg-gradient-to-r from-light-yellow to-light-red  p-6 md:p-12 rounded-4xl mb-6 md:mb-0"}  style={{maxWidth:"440px"}}>
                Are you looking to <b>promote products you love</b> and <b>earn better</b> for your influence?
              </div>  
              <div className={s.block+" bg-gradient-to-r from-light-blue to-light-red  p-6 md:p-12 rounded-4xl ml-12"} style={{maxWidth:"400px"}}>
                Do you want to <b>enhance your partnership</b> with companies?
              </div>
            </div>
          </div>
          <div className="md:pr-12 pl-10 md:pl-0">
            <div className="flex flex-col items-end">
              <div className="mx-auto relative" style={{maxWidth:"600px"}}>                  
                <img src="/images/home_image_influencers.svg"/>                  
              </div> 
              <div className="relative -mt-24 mr-24 z-10"><Button to="/influencer" type="action">Know More...</Button></div>  
            </div>
          </div>
        </div> 
      </div>  
    </div>
  )
  let guest_=(
    <div className="border-b-2 border-light-blue md:pt-32 py-24 md:py-48 pb-24 md:py-0 md:min-h-screen flex justify-center items-center ">
      <div className="mx-auto flex justify-center items-center  text-center md:text-left px-6" style={{maxWidth:"1224px"}}>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-6/12 md:pr-12 mb-24 md:mb-0 relative ">
            <div className="text-4xl md:text-5xl font-bold mb-8">Finding the win-win scenario for businesses and influencers.</div>  
            <div className="text-2xl md:text-3xl font-light">Now have <span className="font-bold">stronger</span> partnerships.</div>   
          </div>
          <div className="w-full md:w-6/12 md:pl-12">
            <div className="mx-auto max-w-md md:max-w-xl">
              <img src="images/home_image_01.svg"/>
            </div>   
          </div>
        </div> 
      </div>
    </div>
  )

  let business_=(
    <div className="border-b-2 border-light-blue">
      <div className="mx-auto flex justify-center items-center py-24 py-24 md:py-36 px-6" style={{maxWidth:"1224px"}}>
        <div className="flex flex-col md:flex-row relative ">
          <div className="md:mt-16">
            <div className="text-4xl md:text-5xl font-bold mb-6 whitespace-nowrap">Businesses</div>  
            <div className="mt-12 md:mt-48 md:ml-12 md:absolute top-0 left-0 z-10 text-xl">
              <div className={s.block+" bg-gradient-to-r from-light-yellow to-light-green p-6 md:p-12 rounded-4xl "}>
                Are you looking to <b>grow your sales</b> with <b>low customer acquisition costs</b>?
              </div>  
              <div className={s.block+" bg-gradient-to-r from-light-blue to-light-green  p-6 md:p-12 rounded-4xl mt-6 ml-12"}>
                Are you a wants to <b>increase your brand name</b> within your target market?
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:pl-12">
            <div className="flex flex-col items-end">
              <div className="mx-auto relative" style={{maxWidth:"100%"}}>                  
                <img src="/images/home_image_business.svg"/>                  
              </div> 
              <div className="relative mt-6 z-10"><Button to="/business"type="action">Know More...</Button></div>  
            </div>
          </div>
        </div> 
      </div> 
    </div>
  )
  let get_started_=(
    <div className="flex flex-col items-center md:flex-row relative p-6 md:py-16 md:pl-16 mt-20">
      <div className="w-full md:w-6/12 md:mr-14">
        <div className="text-3xl md:text-4xl font-bold mb-6 ">Get Started Guide</div> 
        <div className="text-lg md:text-xl mb-6 ">Step by step video guide to Launch an Influencer Marketing Campaign in 7 steps ...</div> 
      </div> 
      <div className="w-full md:w-6/12 ">
        <div className="mx-auto relative">  
          <video width="100%" controls>
            <source src=" https://ik.imagekit.io/ycc/user/pexels-jack-sparrow-5977053_YXyJEMueQ.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>  
    </div>  
  )
  let influencer_=(
    <div className="">
      <div className="mx-auto py-24 md:py-36 px-6" style={{maxWidth:"1040px"}}>
        <div className="flex flex-col md:flex-row relative bg-gradient-to-r from-light-yellow to-light-red  p-6 md:py-16 md:pl-16 rounded-4xl">
          <div className="w-full md:w-6/12">
            <div className="text-4xl md:text-5xl font-bold mb-6 whitespace-nowrap">Hi {user.name},</div>  
            <div className="text-xl md:text-3xl mb-6 whitespace-nowrap">Now you can <b>Influence Better</b></div> 
            <div className="flex flex-col mt-12 ml-12 text-xl" style={{maxWidth:'360px'}}>
              <div className={"pb-6"} >
                <b>Promote products you love</b> and earn better for your influence.
              </div>  
              <div className={"pb-6"} >
                <b>Achieve more </b>with increased engagement.
              </div>
              <div className={"pb-6"} >
                <b>Earn a fixed fee </b>plus a variable component for all promotions.
              </div>
              <div className={"pb-6"} >
                <b>Connect with your community </b>with more genuinity and trust. 
              </div>
              <div className={"pb-6"} >
                <b>Partner </b>with a large pool of businesses.
              </div>
            </div>
          </div>
          <div className="w-full md:w-6/12 ">
            <div className="flex flex-col items-end md:ml-24 md:-mr-36">
              <div className="mx-auto relative" style={{maxWidth:"500px"}}>                  
                <img src="/images/home_image_influencers.svg"/>                  
              </div>               
            </div>
          </div>
        </div> 
        {dev==true && get_started_}        
      </div>  
    </div>
  )

  let only_guest=(
    <div>
      {guest_}
      {guest_business_}
      {guest_influencer_}
    </div>
  )

  let only_influencer=(
    <div>      
      {influencer_}
    </div>
  )

  let only_business=(
    <div>      
      {business_}
    </div>
  )
  return (    
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className={s.inner}>         
          {(user.userType!='influencer' && user.userType!='business') && only_guest}
          {user.userType=='influencer' && only_influencer}
          {user.userType=='business' && only_business}
          {/*<LogoutBtn/>
          <TestUser/>  */} 
        </div>
      </div>
    </Guest>      
  )
}
export default com
