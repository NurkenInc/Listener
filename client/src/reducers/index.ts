import { combineReducers } from 'redux';

import authReducer from './auth';
import deckReducer from './decks';
import cardReducer from './cards';

const reducers = combineReducers({ authReducer, deckReducer, cardReducer });

export default reducers;