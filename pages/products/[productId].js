import Image from "next/image";
import { useRouter } from "next/router";
import {AiFillStar} from "react-icons/ai"
import { GRAPHQL_URL } from '../lib/constants'

let prodId
function Product({product}) {
  const router = useRouter()
  prodId = router.query.productId

  return (
    <div className="px-3 mt-5 text-gray-500">
      <div className="relative   w-full h-[350px]  overflow-hidden rounded-t-md">
        <Image src={product.imageUrl} alt={product.title}  fill  className=""/>
      </div>

      <div className="flex items-center justify-between">
        <div className="pt-1">
          <h3 className="text-2xl font-titilliumWeb capitalize font-semibold">{product.title}</h3>
        </div>
        <span className="bg-yellow-100 flex items-center space-x-3 p-1 font-changa  rounded-md">
              <AiFillStar className="text-yellow-400 w-7 h-7"/>
              <p className="text-yellow-400 text-xl">4.5</p>
        </span>
      </div>

      <div>
        <h2 className="my-3 capitalize text-lg ">description</h2>
        <p>{product.description}</p>
      </div>

      <div className="flex items-center space-x-3 my-5">
      <div className="relative   w-[100px] h-[100px]  overflow-hidden rounded-md">
        <Image src={product.imageUrl} alt={product.title}  fill  className=""/>
      </div>
      <div className="relative   w-[100px] h-[100px]  overflow-hidden rounded-md">
        <Image src={product.imageUrl} alt={product.title}  fill  className=""/>
      </div>
      <div className="relative   w-[100px] h-[100px]  overflow-hidden rounded-md">
        <Image src={product.imageUrl} alt={product.title}  fill  className=""/>
      </div>
      </div>

      <div className="flex items-center justify-between my-4">
          <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white shadow-md"></div>
          <div className="w-10 h-10 rounded-full bg-yellow-400 shadow-md"></div>
          <div className="w-10 h-10 rounded-full bg-blue-500 shadow-md"></div>
          <div className="w-10 h-10 rounded-full bg-green-400 shadow-md"></div>
          </div>

          <div className=" bg-gray-300  w-22 lg:w-24 py-[1px] px-1  rounded-xl text-gray-800">
            <div className="flex items-center justify-center space-x-4 ">
              <span className="bg-gray-100 w-5 h-5 flex items-center justify-center p-[12px] rounded-full cursor-pointer text-xl">-</span>
              <p className="text-xl ">1</p>
              <span className="bg-gray-100 w-5 h-5 flex items-center justify-center p-[12px] rounded-full cursor-pointer text-xl">+</span>
            </div>
          </div>
         </div>

          <botton className=" bg-yellow-400 w-full rounded-lg py-4 text-xl text-white capitalize px-8 my-6  flex mx-auto text-center justify-center">  add to cart | N{product.price}</botton>

    </div>
  )
}

export default Product


export const getServerSideProps = async () => {
  const graphqlQuery = {
    query: `
    {
      product(id: 1) {
        title
        price
        imageUrl
        description
      }
    }
    `
  };
   const result = await fetch(GRAPHQL_URL , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {  
        return res.json();
      })
      .then(resData => {
        return resData
      })
      .catch(err => console.log(err))
     
      const data = await result
    return {
      props: {
        product: data.data.product
      }
    }
  }