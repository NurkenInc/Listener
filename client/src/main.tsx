import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Deck from './components/Deck/Deck';
import CustomSidebar from './components/Sidebar/CustomSidebar';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import CreateCardModal from './components/CreateCardModal/CreateCardModal';
import CardLayout from './components/CardLayout/CardLayouts';
import { getDecks } from './api';
import { handleOnSubmitCreateCard } from './components/Sidebar/CustomSidebar';
import FolderLayout from './components/FolderLayout/FolderLayout';
import NotFound from './components/NotFound/NotFound';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home/Home.jsx';
import GetStarted from './pages/GetStarted/GetStarted';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';
import Navbar from './components/Navbar/Navbar';
import OTPVerify from './components/OTPVerify/OTPVerify';


const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home />,
        errorElement: <NotFound />
    },
    {
        path: '/',
        element: <Navigate to={'/home'} />,
        errorElement: <NotFound />,
    },
    {
        path: "/listener",
        element: <App />,
        loader: getDecks, 
        errorElement: <NotFound />,
        children: [
            {
                path: "/listener",
                element: <GetStarted />,
                errorElement: <NotFound />,
            },
            {
                path: "/listener/decks/:deckId/cards",
                element: <CreateCardModal handleOnSubmit={handleOnSubmitCreateCard} />,
                errorElement: <NotFound />,
            },
            {
                path: "/listener/decks/:deckId/cards/:index",
                element: <CardLayout />,
                errorElement: <NotFound />,
            }, 
            {
                path: "/listener/decks/:deckId",
                element: <FolderLayout />,
                errorElement: <NotFound />,
            }
        ]
    },
    {
        path: "/account/login",
        element: <Login />,
        errorElement: <NotFound />,
    },
    {
        path: "/account/signup",
        element: <Signup />,
        errorElement: <NotFound />,
    }, 
    {
        path: "/verifyEmail",
        element: <OTPVerify />,
        errorElement: <NotFound />,
    }
]);

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);

