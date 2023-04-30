import React from 'react';
import { 
  Outlet, 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  useNavigate
} from 'react-router-dom';
import { 
  ClerkProvider,
  SignIn,
  SignUp,
} from '@clerk/clerk-react'
import { ProSidebarProvider } from 'react-pro-sidebar';

import { 
  CustomSidebar, 
  Navbar, 
  CardLayout, 
  FolderLayout, 
  NotFound, 
  OTPVerify,
  CreateCardModal
} from './components';
import { Home, GetStarted, Auth } from './pages';

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

const clerk_pub_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const ClerkProviderWithRouter = () => {
  const navigate = useNavigate()
  
  return (
    <ClerkProvider
      publishableKey={clerk_pub_key}
      navigate={(to) => navigate(to)}
    >
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} errorElement={<NotFound />} />
        <Route path='/home' element={<Home />} errorElement={<NotFound />} />
        <Route 
          path='/account/login' 
          element={<Auth><SignIn redirectUrl={'/listener'} signUpUrl='/account/signup' /></Auth>} 
          errorElement={<NotFound />} 
        />
        <Route 
          path='/account/signup' 
          element={<Auth><SignUp redirectUrl={'/listener'} signInUrl='/account/login' /></Auth>} 
          errorElement={<NotFound />} 
        />
        <Route path='/verifyEmail' element={<OTPVerify />} errorElement={<NotFound />} />
        <Route 
          path='/listener' 
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
    </ClerkProvider>
  )
}

function App() {
  return (
    <Router>
      <ClerkProviderWithRouter />
    </Router>
  );
}

export default App;