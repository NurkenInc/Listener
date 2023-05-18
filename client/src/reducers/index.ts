import { combineReducers } from 'redux';

import authReducer from './auth';
import deckReducer from './decks';
import cardReducer from './cards';

const reducers = combineReducers({ 
  auth: authReducer, 
  deck: deckReducer,
  card: cardReducer
});

export default reducers;