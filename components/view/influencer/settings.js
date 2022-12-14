import React, { useState, useEffect } from 'react';
import Settings from '../../../ui/lib/view/influencer/settings';
import getUser from '../../get/user';
import process from '../../process';
//import {rejectHandler, acceptHandler, messageHandler, initPaymentPaidHandler} from './action';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {   

  const router = useRouter(); 

  const args = process()  
  args.showfooter=false 

  const[isArgs, setArgs] = useState(args)
  const[isItem, setItem] = useState({})

  const getData = async () => {  
    let user=getUser()
    console.log('influencer', user)    
    const influencer = await axios.post(process.env.API+'/api/com/profile/action', {action:'get_influencer', influencer_id:user.id});
    console.log('get_influencer_data', influencer.data)

    setArgs({...isArgs, item:influencer.data})       
  }   
  const handler = async (i)=>{
    console.log("handler "+i.action, i)
    const influencer = await axios.post(process.env.API+'/api/com/profile/action', i);
    console.log("handler data "+i.action, influencer.data)
    return influencer.data
  }

  useEffect(() => { 
    getData() 
    console.log(12)      
  }, []); 
  
  return (
    <Settings {...isArgs}   handler={handler}>Influencer Settings</Settings>
  )
}
export default com
