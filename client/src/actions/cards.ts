import { 
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARD_SUCCESS,
  CARD_REQUEST,
  CARD_FAILURE,
} from '../constants/actionTypes';

import axios from 'axios';

const API  = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

const setupAPI = (token: string) => {
  API.interceptors.request.use((req: any) => {
    if(token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  })
}

export const createCard = (card: object, deckId: string, token: string) => {
  return async (dispatch: any) => {
    dispatch({ type: CARD_REQUEST })

    try {
      setupAPI(token);
      
      const { data } = await API.post(`/decks/${deckId}/cards`, card);

      dispatch({
        type: CREATE_CARD_SUCCESS,
        payload: data
      })

    } catch (error) {
      dispatch({ type: CARD_FAILURE, payload: error })     
    }
  }
}

export const getCards = (token: string, deckId: string) => {
  return async (dispatch : any) => {
    dispatch({ type: CARD_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.get(`/decks/:${deckId}`);

      dispatch({
        type: FETCH_CARDS_SUCCESS,
        payload: data.cards
      });

    } catch (error) {
      dispatch({ type: CARD_FAILURE, payload: error });
    }
  }
}

export const getCard = (token: string, deckId: string, cardId: string) => {
  return async (dispatch : any) => {
    dispatch({ type: CARD_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.get(`/decks/${deckId}`);

      const card = data.cards.find((card : any) => card.id === cardId);

      dispatch({
        type: FETCH_CARD_SUCCESS,
        payload: card
      });

    } catch (error) {
      dispatch({ type: CARD_FAILURE, payload: error });
    }
  }
}

export const updateCard = (token : string, deckId: string, cardId: string, card: object) => {
  return async (dispatch : any) => {
    dispatch({ type: CARD_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.patch(`/decks/${deckId}/cards/${cardId}`, card);

      dispatch({
        type: UPDATE_CARD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({ type: CARD_FAILURE, payload: error });
    }
  }
}

export const deleteCard = (token : string, deckId: string, cardId: string) => {
  return async (dispatch : any) => {
    dispatch({ type: CARD_REQUEST });

    try {
      setupAPI(token);

      const { data } = await API.delete(`/decks/${deckId}/cards:${cardId}`);

      dispatch({
        type: DELETE_CARD_SUCCESS,
        payload: data
      });
      
    } catch (error) {
      dispatch({ type: CARD_FAILURE, payload: error });
    }
  }
}