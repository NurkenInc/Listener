import { 
  CREATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARD_SUCCESS,
  CARD_REQUEST,
  CARD_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  data: [],
  currentCard: null,
  error: null,
}

const cardReducer = (state = initialState, action : any) => {
  switch(action.type) {
    case CARD_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload]
      }
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: state.data.map((item : any) => 
        item.id === action.payload.id ? action.payload : item)
      }
    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((item : any) => 
        item.id !== action.payload.id)
      }
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case FETCH_CARD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentCard: action.payload
      }
    case CARD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default cardReducer;