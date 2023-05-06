import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const SidebarHeader = ({ onClose } : { onClose: any }) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='px-8 font-bold text-white text-[20px]'>
        <h3>Listener</h3>
      </div>
      <div className='text-right py-4'>
        <button className='bg-transparent text-white px-2 py-2' onClick={onClose}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  )
}

export default SidebarHeader