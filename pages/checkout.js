import Header from '../components/Header'
import Checkout from '../components/Checkout'
import Footer from '../components/Footer'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectedOrderItems } from '../slices/orderSlice';
import { selectedcartItems, selectTotal } from '../slices/cartSlice';
import { TbCurrencyNaira } from 'react-icons/tb';

function CheckoutPage() {
  const router = useRouter()
  const orderItems = useSelector(selectedOrderItems);
  const orderId = orderItems.map((order) => order)

  console.log(`this is the orders id ${orderId}`)

  const cartItems = useSelector(selectedcartItems);
  const cartTotal = useSelector(selectTotal)


  const [orderDetails, setOrderDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    country: 'Nigeria',
    postalCode: '',
    state: '',
  })
  return (
    <div className="">
      <Header />
      <h2 className='uppercase text-gray-700 mb-2 px-3 my-10'>
                1. review your order (2 items)
            </h2>
            {cartItems.map(
          ({ product, qty}) => (
            <Checkout
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              productQty={qty}
              cartTotal={cartTotal}
              image={product.image}
            />
          )
        )}
        <div className='px-3'>
        <div className='flex justify-between bg-gray-200 shodow-lg  p-2 text-gray-700 my-4'>
          <div className='capitalize font-bold'>subtotal:</div>
          <div className='flex items-center text-s'><TbCurrencyNaira  className="w-4 h-5"/><p className='font-bold text-xs'>{cartTotal.toLocaleString()}</p></div>
        </div>
        </div>
        
      <div className='px-3'>
        <h2 className='uppercase text-gray-700 my-2'>2. delivery address</h2>
        <p className='text-xs capitalize'>all fields required</p>

        <form className='my-3'>

        <input
              type='text'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5'
              placeholder='Email '
              required
              // onChange={passwordInputHandler}
            />
        <input
              type='text'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5'
              placeholder='First Name'
              required
              // onChange={passwordInputHandler}
            />
        <input
              type='text'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5'
              placeholder='Last Name '
              required
              // onChange={passwordInputHandler}
            />
              
             <input
                type='number'
                className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5'
                placeholder='Phone Number e.g 081 '
                required
                // onChange={passwordInputHandler}
              />
             <input
                type='text'
                className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5'
                placeholder='Devivery address '
                required
                // onChange={passwordInputHandler}
              />

          <select className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5 text-gray-500'>
            <option>select state</option>
            <option>Abuja</option>
            <option>Ibadan</option>
            <option>Kaduna</option>
            <option>Katsina</option>
            <option>Port Harcourt</option>
            <option>Lagos</option>
          </select>

        <input
              type='text'
              className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5'
              placeholder='Postcode  / Zip Code. optional '
              required
              // onChange={passwordInputHandler}
            />

<select className='border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-500 outline-none px-4 py-[16px] w-full  m-auto flex my-5 lg:my-5 text-gray-700'>
            <option>Nigeria</option>
          </select>
            
        </form>
        
      </div>

      {/* <Footer/> */}
    </div>
  )
}

export default CheckoutPage