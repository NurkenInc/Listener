import { ProSidebarProvider } from 'react-pro-sidebar';
import CustomSidebar from './components/Sidebar/CustomSidebar';
import './App.css';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar';

function App() {

    return (
      <div>
          <div className='w-full z-30 fixed'>
              <Navbar />
          </div>
          <div className='flex' id="outer-container">
              <ProSidebarProvider>
                  <CustomSidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
              </ProSidebarProvider>
              <div id="detail" className=' mt-8 w-[100vw]'>
                  <div id='page-wrap' className=' mt-20 w-[100vw] items-center flex flex-col'>
                      <Outlet />
                  </div>
              </div>
          </div>
      </div>
    );
}

export default App;
