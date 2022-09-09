import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Input from '../ui/lib/input';
import Button from '../ui/lib/button';

import Test  from '../components/view/test_v';


export default  function Home(props) {  
  console.log("VIEW test", props)
  return (
    <div>
      <Head>
        <title>Platovice Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <Test {...props}/>   
    </div>
  )
}

