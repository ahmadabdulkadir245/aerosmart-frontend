import Head from "next/head"
import ProductAddedToCart from "../components/ProductAddedToCart";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectedcartItems, selectTotal } from "../slices/cartSlice";
import {TbCurrencyNaira} from "react-icons/tb"
import { useRouter } from "next/navigation";



function Cart() {
  const router = useRouter()
  const cartItems = useSelector(selectedcartItems);
  const cartTotal = useSelector(selectTotal)
  const cartId = cartItems.map(cartItem => cartItem.product.id)
  console.log(cartItems)
  if (cartItems.length === 0) {
    return (
      <>
      <Header /> 
      <div className='iceland mt-4 m-auto w-[95%] lg:max-w-5xl text-[#181818] '>
       <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* fonts import */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />
          <link href='https://fonts.googleapis.com/css2?family=Calligraffitti&family=Changa:wght@200;300;400;500;600;700;800&family=Edu+VIC+WA+NT+Beginner:wght@400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Cairo:wght@200;300;400;500;600;700;800;900;1000&family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,600;1,700;1,800&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Play:wght@400;700&family=Rajdhani:wght@300;400;500;600;700&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Metal+Mania&family=Montez&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Play:wght@400;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400;1,500;1,700;1,900&family=Sedgwick+Ave+Display&display=swap&family=PT+Serif:ital@0;1&display=swap'
            rel='stylesheet'
          />

      </Head>
      
        <p className=' text-center text-3xl mt-10 h-[90vh]'>No porducts in cart</p>
      </div>
      </>
    );
  }
  return (
    <div className=''>
      <Header />
      <div className='mt-5 m-auto  lg:max-w-5xl  h-[calc(100vh-124px)] transition-all duration-500 ease-in overflow-y-scroll '>
        <div className="flex items-center justify-between  px-[12px] text-gray-800 bg-white py-2 rounded-md">
          <div className="flex ">
            <p className="uppercase">subtotal </p>
            <p > - ({" "} {cartItems.length} {cartItems.length > 1 ? 
            'Products' : 
            'Product'} {" "} )</p>
          </div>
          <div>
            <p className="flex items-center "><TbCurrencyNaira  className="w-5 h-5"/>{cartTotal.toLocaleString()}</p>
          </div>
        </div>
        {/* <h1 className='text-4xl text-center md:text-left '>
          ca<span className='text-yellow-600'>rt</span>
        </h1>
        <hr className='w-[86%] m-auto md:w-full h-[2px] bg-[#181818]    ' /> */}
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
              {/* <div className="flex justify-between items-center capitalize ">
                total payment:
              <div className="flex items-center">
              <TbCurrencyNaira  className="w-5 h-5"/>
              {cartTotal.toLocaleString()}
              </div>
              </div> */}

              <button
            className=' mt-1 mb-2 mx-auto bg-yellow-400 py-2  w-full text-white rounded-md  capitalize  text-lg tracking-wider font-light flex justify-center items-center'
            onClick={() => router.push('/checkout')}
          >
              
          buy now |   <TbCurrencyNaira  className="w-6 h-7"/>{cartTotal.toLocaleString()}
          </button>
          </div>

    </div>

  )
}

export default Cart

