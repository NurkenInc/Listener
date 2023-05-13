import { configureStore } from '@reduxjs/toolkit'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import deckReducer from '../reducers/decks';
import cardReducer from '../reducers/cards';
import reducers from '../reducers';

export const store = configureStore({
  reducer: {
    deck: deckReducer,
    card: cardReducer,
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

const mainStore = createStore(reducers, compose(applyMiddleware(thunk)));

export default mainStore;