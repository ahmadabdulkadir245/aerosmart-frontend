import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../slices/basketSlice";
import { AiFillStar, AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { useState } from "react";

function ProductAddedToCart({ id, title, price, category, description, image }) {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    // remove the item from redux
    dispatch(removeFromBasket({ id }));
  };
  const [numberOfItems, setNumberOfItems] = useState(1);

  const addItemNum = () => setNumberOfItems((prevNum) => prevNum + 1);
  const reduceItemNum = () => {
    if (numberOfItems < 2) {
      return;
    }
    setNumberOfItems((prevNum) => prevNum - 1);
    // if (numberOfItems < 2) {
    //   setNumberOfItems(1);
    // }
  };

  return (
    <div className='grid grid-cols-3  px-3 gap-4 my-4'>
      
      <div className='relative w-full h-[120px] text-gray-600 '>
        <Image src={image} alt={title} fill />
      </div>
      <div className='col-span-2 '>
        <p className='truncate uppercase'>{title}</p>
      <p className="lowercase leading-5 line-clamp-2">{description} the description is too short so to make sure its up to two line</p>
        {/* <div className='flex  pr-3'>
          {Array(5)
            .fill(1)
            .map((_, i) => (
            <AiFillStar key={_} className="text-yellow-400 w-5 h-5"/>
            ))}
        </div> */}
              <div className="flex-nowrap flex justify-between mt-[19px]">
        <div className=' flex justify-between items-center w-32'>
        <div
          className={`flex justify-center items-center py-2 px-3 bg-yellow-400 transition duration-200 linear rounded-md ${
            numberOfItems < 2 ? " opacity-50" : ""
          }`}
        >
          <AiOutlineMinus onClick={reduceItemNum} className='text-white' />
        </div>
        <div>{numberOfItems}</div>
        <div className='flex justify-center items-center py-2 px-3 bg-yellow-500 rounded-md'>
          <AiOutlinePlus onClick={addItemNum} className='text-white' />
        </div>
          </div>

        <div className='flex '>
        <div
          className='flex space-x-3 items-center  bg-red-500  py-2 px-3 text-white rounded-md hover:bg-red-600 cursor-pointer transition duration-200 ease-in'
          onClick={removeItemFromBasket}
        >
          <AiOutlineDelete className='' /> 
      </div>
      </div>
      </div>

      </div>

              
    </div>
  );
}

export default ProductAddedToCart;
