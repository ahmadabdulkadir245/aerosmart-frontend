import Head from "next/head"
import ProductAddedToCart from "../components/ProductAddedToCart";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart, selectedcartItems, selectTotal } from "../slices/cartSlice";
import {TbCurrencyNaira} from "react-icons/tb"
import { useRouter } from "next/navigation";
import { addToOrder } from "../slices/orderSlice";



function Cart() {
  const router = useRouter()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectedcartItems);
  const cartTotal = useSelector(selectTotal)
  const checkoutHandler =  () => {
    dispatch(addToOrder(cartItems))
    router.push('/checkout')
    setTimeout(() => {
      dispatch(emptyCart())
    }, 3000);
  }
  if (cartItems.length === 0) {
    return (
      <>
      <Header /> 
      <div className='iceland mt-4 m-auto w-[95%] lg:max-w-5xl text-[#181818]'>
       <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* fonts import */}
      </Head>
      
        <p className=' text-center text-3xl mt-10 h-[90vh]'>No porducts in cart</p>
      </div>
      </>
    );
  }
  return (
    <div className=''>
      <Header />
      <div className='pt-5 m-auto  lg:max-w-5xl  h-[calc(100vh-124px)] transition-all duration-500 ease-in overflow-y-scroll '>
        <div className="flex items-center justify-between  px-[12px] text-gray-800 bg-white py-2 rounded-md">
          <div className="flex ">
            <p className="uppercase">subtotal </p>
            <p > - ({" "} {cartItems.length} {cartItems.length > 1 ? 
            'Products' : 
            'Product'} {" "} )</p>
          </div>
          <div>
            <p className="flex items-center "><TbCurrencyNaira  className="w-5 h-5 font-bold"/>{cartTotal.toLocaleString()}</p>
          </div>
        </div>
        {cartItems.map(
          ({ product, qty}) => (
            <ProductAddedToCart
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              productQty={qty}
              image={product.image}
            />
          )
        )}
      </div>
      <div className="fixed left-0 bottom-0 px-3 shadow-xl w-full  text-lg bg-white z-10 pt-2 overflow-hiddentext-gray-500">
      <button className="capitalize w-[90%] h-[48px] rounded-md text-white  text-sm bg-yellow-500  mb-2 flex items-center justify-center m-auto " 
      onClick={checkoutHandler}>BuY Now | <TbCurrencyNaira  className="w-5 h-5"/>{cartTotal.toLocaleString()}
      </button>
          </div>
     </div>

  )
}

export default Cart

