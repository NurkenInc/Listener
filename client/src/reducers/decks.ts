import { 
  CREATE_DECK_SUCCESS,
  DELETE_DECK_SUCCESS,
  UPDATE_DECK_SUCCESS,
  FETCH_DECKS_SUCCESS,
  FETCH_DECK_SUCCESS,
  DECK_REQUEST,
  DECK_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  data: [],
  currentDeck: null,
  error: null
}

const deckReducer = (state = initialState, action : any) => {
  switch(action.type) {
    case DECK_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_DECK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload]
      }
    case UPDATE_DECK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: state.data.map((item : any) => 
        item.id === action.payload.id ? action.payload : item)
      }
    case DELETE_DECK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((item : any) => 
        item.id !== action.payload.id)
      }
    case FETCH_DECKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case FETCH_DECK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentDeck: action.payload
      }
    case DECK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default deckReducer;