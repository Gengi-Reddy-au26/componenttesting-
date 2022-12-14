import React, { useState } from "react";
import Guest from './guest';
import Title from '../title';
import Subscribe from '../subscribe';
import s from './influencer.module.scss';
const com = ({cat, children, subscribeHandler,  ...props} ) => { 
  
  const Block=({i, title, desc, image, icon, alt, points})=>{
    const c_=alt? "md:order-1 md:pl-12 " :' md:pr-12 '
    const c2_=alt? "md:pr-12  " :' md:pl-12  '

    const b_=alt? " from-light-blue " :' from-light-yellow  '
    console.log(i)
    const points_=points?.map((point, index)=>{
      return(
        <div key={index} className="flex items-center">
          <div className="mr-2"><img src="/images/point_white_icon.svg"/></div>
          <div>{point}</div>
        </div>
      )
    })
    return(
      <div className="flex flex-col md:flex-row relative py-4 md:py-24 md:pr-12">
        <div className={"w-full md:2-6/12 pt-12 mb-12 md:mb-0 "+c_}>
          <div className="text-2xl md:text-3xl font-bold mb-6 ">{title}</div> 
          <div className="text-md md:text-xl">{desc}</div>                   
        </div>
        <div className={"w-full md:2-6/12 "+c2_}>
          <div className=" flex flex-col items-end "> 
            <div className="relative w-full"> 
              <div className={b_+" bg-gradient-to-br relative z-10 to-light-red  flex flex-col items-center justify-center rounded-4xl px-6 py-12 md:px-12 "}>
                <div><img src={"/images/"+icon}/></div> 
                {points && <div className="mt-12">{points_}</div>}
              </div>
              <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center -mt-8 -mb-8  -mx-6">
                {i==0 && <img className="w-full" src="/images/Vector 119.svg"/>}
                {i==1 && <img className="w-full" src="/images/Vector 120.svg"/>}
                {i==2 && <img className="w-full" src="/images/Vector 121.svg"/>}
                {i==3 && <img className="w-full" src="/images/Vector 122.svg"/>}
              </div> 
            </div>                                   
          </div>
        </div>
      </div> 
    )
  } 


  const blocks=[
    {
      title:"Shop",
      desc:"Earn many more times based on the engagement and sales you develop on the content created by you.",
      icon:'shop_icon.svg', 
      alt:false,     
    },
    {
      title:"Right Match",
      desc:"Match with the products you love, only promote the one's you love and connect with the companies for it.",
      icon:'match_icon.svg',   
      alt:true,  
    },
    {
      title:"Earn",
      desc:"Earn many more times based on the engagement and sales you develop on the content created by you.",
      icon:'earn_icon.svg',  
      alt:false,   
    },   
  ]

  const blocks_=blocks.map((block, index)=>{
    return(
      <Block key={index} i={index} {...block}></Block>
    )
  })

  return (
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className="">
          {/*children*/}  
          <div className="relative bg-cover bg-bottom mb-24 mt-8 md:mt-0" style={{backgroundImage:"url(/images/pexels-andrea-piacquadio-972995.jpg)"}}>
            <div className={s.header+" relative z-10 min-h-screen md:h-screen mx-auto flex justify-start items-end px-6"} style={{maxWidth:"1224px"}}>
              <div className="flex flex-wrap items-center w-full ">
                <div className="w-full md:w-5/12 relative z-10 -mb-24 md:mb-24">
                  <div className={"shadow-box bg-white relative z-10 px-6 py-6 md:px-12 md:py-12 rounded-xl"}>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Influence Better</div> 
                    <div className="md:ml-4 text-md md:text-lg"> 
                      <div className="flex items-start mb-4">
                        <img className="mr-4 w-8" src="/images/Chart_alt_duotone_line.svg"/>
                        <div>Promote products you love and earn better for your influence.</div>
                      </div> 
                      <div className="flex items-start">
                        <img className="mr-4 w-8" src="/images/Chart_alt_duotone_line.svg"/>
                        <div>Enhance your partnership with companies.</div>
                      </div>
                    </div>                    
                  </div>
                  <div className="absolute top-0 right-0 -mrx-12 -mt-12  w-24 md:w-36 z-10"><img  src="/images/signal.svg"/></div>  
                  <div className="absolute z-0 bottom-0 right-0 -mb-6 mr-4 w-64"><img src="/images/Rectangle 55.svg"/></div>    
                </div>                             
              </div> 
            </div>
            <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-white h-48"></div>
          </div>{/* header */}

          <div className="">
            <div className="mx-auto flex justify-center items-center py-24 py-24 md:py-36 pl-6 md:px-6" style={{maxWidth:"1224px"}}>
              <div className="flex flex-col md:flex-row relative ">
                <div className="">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 whitespace-nowrap">What you get?</div>                    
                </div>
                <div className="">
                  <div className="flex flex-col items-end">
                    <div className="mx-auto relative" style={{maxWidth:"100%"}}>  
                      <img className="hidden md:block" src="/images/influencer_info_1.svg"/>
                      <img className="md:hidden" src="/images/influencer_info_2.svg"/>                   
                    </div>                    
                  </div>
                </div>
              </div> 
            </div> 
          </div>{/* business*/}

          <div className="bg-gradient-to-r from-light-yellow to-light-red ">
            <div className="mx-auto flex justify-center py-12 px-12" style={{maxWidth:"1224px"}}>
              <Subscribe user_type="influencer"  handler={subscribeHandler}/>
            </div>
          </div>{/* subscribe*/}      
        
          <div className="">
            <div className="mx-auto py-12 md:py-24 px-6" style={{maxWidth:"1224px"}}>
              {blocks_}
            </div> 
          </div>{/* points*/}

          <div className="">
            <div className="mx-auto flex justify-center py-12 px-12" style={{maxWidth:"1224px"}}>
              <Subscribe user_type="influencer" layout="2" handler={subscribeHandler}/>
            </div>
          </div>{/* subscribe*/}
          
        </div>
      </div>
    </Guest>    
  )
}
export default com
