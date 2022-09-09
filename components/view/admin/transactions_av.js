import React, { useState, useEffect } from 'react';
import Transactions from '../../../ui/lib/view/admin/transactions_au';
import getUser from '../../get/user';
import process from '../../process';
import axios from 'axios';
import { useRouter } from 'next/router';

const com = ({id, ...props}) => {  
  const args = process()   
  if(args.user && args.user.userType!="admin")  return (<div></div>)
  const getData = async (i={}) => { 
    const res = await axios.post(process.env.API+'/api/admin/transactions', {action:'get', ...i});
    console.log('res_data', res.data)   
    return res.data    
  }   
  
  const handler= async (i)=>{
    console.log('handler :' + i.action, i) 
    const res = await axios.post(process.env.API+'/api/admin/transactions', i);
    console.log('handler_data: ' + i.action, res.data)     
  } 

  return (
    <Transactions {...args}  getData={getData} handler={handler}></Transactions>
  )
}
export default com
