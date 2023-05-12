import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

const SidebarFooter = () => {
  return (
    <div className='absolute bottom-5 w-[100%]'>
      <div className='py-3 px-1 flex items-center justify-center'>
        <div className='w-[70%] h-[100%] rounded-md bg-gradient-to-b from-cyan-500 to-blue-500 flex-col'>
          <div className='flex justify-center items-center py-2 pt-6'>
            <div className='text-black w-max h-max rounded-full bg-white'>
                <AiFillGithub size='3rem' />
            </div>
          </div>
          <div className='text-white text-center'>
            Github
          </div>
          <div className='w-[100%] py-4 pb-6 flex justify-center'>
            <a href="https://github.com/NurkenInc" target='_blank'>
              <button className='py-1 rounded-full'>
                Contact
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarFooter