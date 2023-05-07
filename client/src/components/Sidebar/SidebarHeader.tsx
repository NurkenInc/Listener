import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const SidebarHeader = ({ onClose } : { onClose: any }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='px-6 flex items-center font-bold text-black text-[20px]'>
        <img src='/icon.png' className='h-[25px]' />
        <h3 className='text-blue-400'>Listener</h3>
      </div>
      <div className='text-right py-4'>
        <button className='bg-transparent text-black px-2 py-2' onClick={onClose}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  )
}

export default SidebarHeader