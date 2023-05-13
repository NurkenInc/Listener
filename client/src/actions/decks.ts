import { AnyAction } from 'redux';
import { 
  CREATE_DECK_SUCCESS,
  DELETE_DECK_SUCCESS,
  UPDATE_DECK_SUCCESS,
  FETCH_DECKS_SUCCESS,
  FETCH_DECK_SUCCESS,
  DECK_REQUEST,
  DECK_FAILURE,
} from '../constants/actionTypes';

import axios from 'axios';

const API  = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

const setupAPI = (token : string) => {
  API.interceptors.request.use((req : any) => {
    if(token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  })
}

export const createDeck = (title : string, token: string) => {
  return async (dispatch : any) => {
    dispatch({ type: DECK_REQUEST })

    try {
      setupAPI(token);
      
      const { data } = await API.post(`/decks`, title);

      dispatch({
        type: CREATE_DECK_SUCCESS,
        payload: data
      })

    } catch (error) {
      dispatch({ type: DECK_FAILURE, payload: error })     
    }
  }
}

export const getDecks = (token : string) => {
  return async (dispatch : any) => {
    dispatch({ type: DECK_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.get(`/decks`);

      dispatch({
        type: FETCH_DECKS_SUCCESS,
        payload: data
      });

    } catch (error) {
      dispatch({ type: DECK_FAILURE, payload: error });
    }
  }
}

export const getDeck = (token : string, deckId: string) => {
  return async (dispatch : any) => {
    dispatch({ type: DECK_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.get(`/decks/${deckId}`);

      dispatch({
        type: FETCH_DECK_SUCCESS,
        payload: data
      });

    } catch (error) {
      dispatch({ type: DECK_FAILURE, payload: error });
    }
  }
}

export const updateDeck = (token : string, deckId: string, title : string) => {
  return async (dispatch : any) => {
    dispatch({ type: DECK_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.patch(`/decks/${deckId}`, title);

      dispatch({
        type: UPDATE_DECK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({ type: DECK_FAILURE, payload: error });
    }
  }
}

export const deleteDeck = (token : string, deckId: string) => {
  return async (dispatch : any) => {
    dispatch({ type: DECK_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.delete(`/decks/${deckId}`);

      dispatch({
        type: DELETE_DECK_SUCCESS,
        payload: data
      });

    } catch (error) {
      dispatch({ type: DECK_FAILURE, payload: error });
    }
  }
}