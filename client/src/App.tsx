import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  Outlet, 
  useNavigate
} from 'react-router-dom';
import { 
  ClerkProvider,
  SignIn,
  SignUp,
} from '@clerk/clerk-react'
import { ChakraProvider } from '@chakra-ui/react';

import { 
  Sidebar, 
  Navbar,
  CardLayout, 
  FolderLayout, 
  NotFound,
  CreateCardModal,
} from '@/components';
import { Home, GetStarted, Auth } from '@/pages';

import './App.css';

const clerk_pub_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const SidebarWrapper = () => {
  return (
    <>
      <ChakraProvider>
        <Sidebar />
      </ChakraProvider>
      <Outlet />
    </>
  )
}

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
        <Route 
          path='/listener' 
          element={<SidebarWrapper />} 
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
            path='/listener/decks/:deckId/cards/:id'
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