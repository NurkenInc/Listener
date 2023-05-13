import React from 'react';
import { useNavigate } from 'react-router-dom';

import './GetStarted.css';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center'>
      <div className='flex lg:flex-row flex-col gradient_01 lg:my-[180px] my-[20px] justify-between items-center gap-36 py-8 w-[95vw] rounded-[15px]'>
        <div className='flex text-left flex-col flex-[0.5] px-8 gap-2'>
          <p className='text-[12px]'>Get started now</p>
          <h3 className='font-bold'>Register today & start track your progress</h3>
        </div>
        <div className='flex-[0.25] lg:mt-0 lg:ml-0 mt-[15px] ml-[25px]'>
          <button onClick={() => {navigate('/account/signup')}} className='bg-black rounded-[50px] py-2 text-white'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default GetStarted;