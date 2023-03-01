import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import CategoryIcons from '../components/CategoryIcons'
import ProductFeed from '../components/ProductFeed'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  //   useEffect(() => {
  //   let token = sessionStorage.getItem("Token");
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, );
  return (
    <div>
      <Head>
        <title>Aerosmart Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>

    <main>
      <Header/>
     <Banner/>
     <CategoryIcons/>
     <ProductFeed/>
     <Footer />
     </main>
    </div>

  )
}