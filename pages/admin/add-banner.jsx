import Head from "next/head"
import { useState } from "react"
import Header from "../../components/Header"
import { GRAPHQL_URL } from '../../lib/constants'


const AddBanner = () => {
  const [bannerData, setBannerData] = useState({
    category: '',
    imageUrl: '',
  })
  const [success, setSuccess] = useState(false)
  const addBannerHandler = (e) => {
    e.preventDefault()

  let graphqlQuery = {
    query: `
    mutation CreateBanner($category: String!, $imageUrl: String!) {
      createBanner(bannerInput: {category: $category, imageUrl: $imageUrl}) {
        category
        imageUrl
      }
    }
  `,
    variables: {
      category: bannerData.category,
      imageUrl: bannerData.imageUrl,
    }
  };

 fetch('http://localhost:8000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphqlQuery)
  })
    .then(res => {  
      return res.json();
    })
    .then(result => {
        setBannerData({
        category: "",
        imageUrl: "",
      })

      setTimeout(() => {
        setSuccess(true)
      }, 1000);
      setTimeout(() => {
        setSuccess(false)
      }, 8000);
    })

    .catch(err => console.log(err))
}

  

    const isUpdate = false
    const bannerInputHandler = (inputIdentifier, e) => {
      setBannerData((currentInputs) => {
        return {
          ...currentInputs,
          [inputIdentifier]: e.target.value,
        };
      });
    };

    // console.log(bannerData)

  return (
    <>
    <Header/>
    <div className="">

          <Head>
           {/* fonts import */}
           <link rel='preconnect' href='https://fonts.googleapis.com' />
      </Head>


    <form onSubmit={addBannerHandler} >
      <h2 className="text-center text-xl uppercase text-gray-500  my-5 [word-spacing: 10px] ">
        {isUpdate ? 'update banner' : 'add banner'}
        <div className="w-[120px] h-[1px] bg-yellow-500 m-auto"></div>
      </h2>
      {success &&
          <p className="text-center text-xl text-green-400 mt-2 transition-all duration-300 ease-out">Banner added successfully </p>
      }
          <input
        type='text'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8'
        placeholder='Banner category'
        required
        name="category"
        value={bannerData.category}
        onChange={bannerInputHandler.bind(this, 'category')}
      />
     
      <input
        type='text'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8'
        placeholder='Image url'
        name="imageUrl"
        required
        value={bannerData.imageUrl}
        onChange={bannerInputHandler.bind(this, 'imageUrl')}
      />

    
      {isUpdate ? (
        <button
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-gray-500 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-[#ffcb05] 2xl:w-[300px] mb-20'
        //   onClick={updateDataHandler}
        >
          Update
        </button>
      ) : (
        <button type="submit"
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-yellow-400 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-yellow-500 2xl:w-[300px] mb-20'
          
        >
          Add
        </button>
      )}
    </form>
    </div>
    </>
  )
}

export default AddBanner