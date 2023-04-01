import Head from "next/head"
import { useState } from "react"
import Header from "../../components/Header"
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const AddProduct = () => {

  const [productData, setProductData] = useState({
    title: '',
    price: '',
    quantity: '',
    imageUrl: '',
    description: ''
  })
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false)
  const [image, setImage] = useState(null)

  const handleFileInputChange = (event) => {
    setImage(event.target.files[0]);
  };

  const addProductHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', image);

    fetch(process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL, {
      method: 'POST',
      body: formData
    })   
    .then(res => res.json())
    .then(fileResData => {
      let image
      return  image = fileResData.image || 'undefined';
    })
    .then(image => {
  let graphqlQuery = {
    query: `
    mutation CreateProduct($title: String!, $price: Int!, $imageUrl: String!, $description: String!) {
      createProduct(productInput: {title: $title, price: $price, imageUrl: $imageUrl, description: $description}) {
        title
        price
        imageUrl
        description
      }
    }
  `,
    variables: {
      title: productData.title,
      price:Number(productData.price),
      imageUrl: image,
      description: content,
    }
  };

 fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
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
      setProductData({
        title: "",
        price: "",
        quantity: "",
        description: ""
      })

      setTimeout(() => {
        setSuccess(true)
      }, 1000);
      setTimeout(() => {
        setSuccess(false)
      }, 8000);
    })
    })
    .catch(err => console.log(err))
}

    const isUpdate = false
    const productInputHandler = (inputIdentifier, e) => {
      setProductData((currentInputs) => {
        return {
          ...currentInputs,
          [inputIdentifier]: e.target.value,
        };
      });
    };

  return (
    <>
    <Header/>
    <div className="">

          <Head>
           {/* fonts import */}
           <link rel='preconnect' href='https://fonts.googleapis.com' />
      </Head>


    <form  >
      <h2 className="text-center text-xl uppercase text-gray-500  my-5 [word-spacing: 10px] ">
        {isUpdate ? 'update product' : 'add product'}
        <div className="w-[120px] h-[1px] bg-yellow-500 m-auto"></div>
      </h2>
      {success &&
          <p className="text-center text-xl text-green-400 mt-2 transition-all duration-300 ease-out">product add successfully </p>
      }
          <input
        type='text'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8'
        placeholder='product name'
        required
        name="title"
        value={productData.title}
        onChange={productInputHandler.bind(this, 'title')}
      />
      <div className="flex">
      <input
        type='number'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[42%]  m-auto flex  lg:my-8'
        placeholder='price'
        name="price"
        required
        value={productData.price}
        onChange={productInputHandler.bind(this, 'price')}
      />
      <input
        type='number'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[42%]  m-auto flex  lg:my-8'
        placeholder='quantity'
        name="quantity"
        required
        value={productData.quantity}
        onChange={productInputHandler.bind(this, 'quantity')}
      />
      </div>

      <input
        type='file'
        className='border-[1px] text-gray-500 lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8'
        placeholder='image url'
        name="imageUrl"
        required
        // value={productData.imageUrl}
        onChange={handleFileInputChange}
      />
    <div className="  font-semibold text-gray-500 h-[300px] overflow-y-scroll shadow-md border border-gray-400 rounded-md overflow-hidden">
      <QuillNoSSRWrapper modules={modules} onChange={setContent} theme="snow" />
      </div>
    {/* <textarea cols={1} rows={8}  className="text-gray-500 border-[1px] lg:border-[1px] rounded-lg md:rounded-full  border-gray-600 outline-none px-6 py-3 w-[90%]  m-auto flex my-6 lg:my-8" placeholder="description" name="description"
        onChange={productInputHandler.bind(this, 'description')}
        value={productData.description}
    ></textarea> */}
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
          onClick={addProductHandler}
        >
          Add
        </button>
      )}
    </form>
    </div>
    </>
  )
}

export default AddProduct