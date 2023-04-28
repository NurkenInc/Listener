import React from 'react';
import { Outlet, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

import { CustomSidebar, Navbar, CardLayout, FolderLayout, NotFound, OTPVerify, Signup, Login, CreateCardModal } from './components';
import { Home, GetStarted } from './pages';

import './App.css';


const CustomSidebarWrapper = () => {
  return (
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
  )
}

function App() {
  return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} errorElement={<NotFound />} />
            <Route path='/home' element={<Home />} errorElement={<NotFound />} />
            <Route path='/account/login' element={<Login />} errorElement={<NotFound />} />
            <Route path='/account/signup' element={<Signup />} errorElement={<NotFound />} />
            <Route path='/verifyEmail' element={<OTPVerify />} errorElement={<NotFound />} />
            <Route 
              path='/listner' 
              element={<CustomSidebarWrapper />} 
              /*loader={getDecks} replace with useEffect?*/ 
              errorElement={<NotFound />} 
            >
              <Route path='/listener' element={<GetStarted />} errorElement={<NotFound />} />
              <Route 
                path='/listener/decks/:deckId/cards' 
                element={<CreateCardModal />} // rewrite its bad prop lift and pass to only track state use redux
                errorElement={<NotFound />}
              />
              <Route 
                path='/listener/decks/:deckId/cards/:index'
                element={<CardLayout />}
                errorElement={<NotFound />}
              />
              <Route 
                path='/listener/decks/:deckId'
                element={<FolderLayout />}
                errorElement={<NotFound />}
              />
            </Route>
          </Routes>
        </Router>
      </>
  );
}

export default App;