import React, { Component }  from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import View  from '../components/view/short_url_v';

function Home(props) {
  const router = useRouter()
  const { short_url } = router.query
  
  console.log(short_url)
  console.log(props)
  

  return (
    <div>
      <Head>
        <title>Platovice {short_url}   </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <View short_code={short_url} {...props}></View> 
    </div>
  )
}
Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  console.log("req", ctx.query)
  const ip = ctx.req.headers["x-forwarded-for"] || ctx.req.socket.remoteAddress; 
  console.log("IP", ip)
  return { stars: json.stargazers_count }
}

/*
export async function getServerSideProps(ctx) {
  console.log("ctx", ctx);
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {}
  }
}
*/
export default Home
