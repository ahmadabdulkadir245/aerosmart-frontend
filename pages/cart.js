import Head from "next/head"
import ProductAddedToCart from "../components/ProductAddedToCart";
import { useSelector } from "react-redux";
import { selectedItems, selectTotal } from "../slices/basketSlice";
import { GRAPHQL_URL } from '../lib/constants'

function Cart() {
  const cartItems = useSelector(selectedItems);
  const cartTotal = useSelector(selectTotal)
  if (cartItems.length === 0) {
    return (
      <div className='iceland mt-4 m-auto w-[95%] lg:max-w-5xl text-[#181818] '>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Calligraffitti&family=Changa:wght@200;300;400;500;600;700;800&family=Edu+VIC+WA+NT+Beginner:wght@400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Metal+Mania&family=Montez&family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Play:wght@400;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,400;1,500;1,700;1,900&family=Sedgwick+Ave+Display&display=swap'
            rel='stylesheet'
          />
        </Head>

        <p className=' text-center text-3xl mt-10'>No porducts in cart</p>
      </div>
    );
  }
  return (
    <div className='font-changa'>
      <div className='mt-5 m-auto  lg:max-w-5xl text-[#181818] uppercase h-[calc(100vh-124px)]'>
        {/* <h1 className='text-4xl text-center md:text-left '>
          ca<span className='text-yellow-600'>rt</span>
        </h1>
        <hr className='w-[86%] m-auto md:w-full h-[2px] bg-[#181818]    ' /> */}
        {cartItems.map(
          ({ id, title, price, description, category, image }) => (
            <ProductAddedToCart
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          )
        )}
      </div>
      <div className="fixed left-0 bottom-0 px-3 shadow-lg w-full  text-xl bg-white z-10 pt-2 overflow-hiddentext-gray-500">
              <div className="flex justify-between items-center capitalize ">
                total payment:
              <div className="flex">
                N{cartTotal.toLocaleString()}
              </div>
              </div>

              <button
            className=' my-3 mx-auto bg-yellow-400 p-4 w-full text-white rounded-md  capitalize  text-xl tracking-wider font-light'
            // onClick={}
          >
          checkout
          </button>
          </div>

    </div>

  )
}

export default Cart

