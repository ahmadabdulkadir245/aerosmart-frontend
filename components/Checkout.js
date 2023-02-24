import Image from 'next/image'
import React from 'react'
import { MdClear } from 'react-icons/md'
import { TbCurrencyNaira } from 'react-icons/tb'

function Checkout({ id, title, price, productQty, description, image, cartTotal }) {
  return (
    <div className='px-3 '>
        <div className=''>
           
                <div className='bg-white py-2 px-3'>
            <div className='relative grid grid-cols-4  gap-3 '>
                <div className='relative col-span-1 w-full h-[80px]'>
                    <Image src={image} alt={title}fill />
                </div>
                <div className=' col-span-2'>
                        <h3 className='uppercase text-sm font-changa'>{title}</h3>
                        <p className='text-xs line-clamp-2 leading-3'>this isthe description and it takes up to 2 lines</p>
                        <p className='text-xs'>Qauntity: 3</p>
                        <p className='text-xs'>Total: </p>
                </div>
                <div className='col-span-1 '>
                <MdClear className="absolute right-2 w-6 h-6 text-gray-500 "/>
                <div className='flex items-center absolute right-2 bottom-1'>  <TbCurrencyNaira  className="w-4 h-4"/>
                <p className='text-xs'>{price.toLocaleString()}</p></div>
                </div>
                </div>
                <div className='w-full h-[1px] bg-gray-500 m-auto mt-2'></div>
            </div>
        </div>
    </div>
  )
}

export default Checkout