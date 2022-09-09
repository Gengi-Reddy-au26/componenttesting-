import React, { useState, useEffect } from "react";
import Guest from './guest';
import Title from '../title';
import Button from '../button';
import Input from '../input2';
import { useRouter } from 'next/router';

import axios from 'axios';
import s from './auth_u.module.scss';

const com = ({children, ...props}) => {
  
  
  return (
    <Guest {...props} viewType="guest" >   
      <div className={s.main+' bg-center bg-cover'} style={{backgroundImage:'url("/images/pexels-oliver-sjöström-1223648.jpg")'}}>   
        <div className={s.inner}>
          {children}
        </div>
      </div>
    </Guest>    
  )
}
export default com
