// import { AUTH } from '../constants/actionTypes';
// import * as api from '../api/index.js';
// import { API_URL } from '../api/config';

// export const signin = (formData : any, navigate : any) => async (dispatch : any) => {
//   try {
//     const { data } = await api.signIn(formData);

//     dispatch({ type: AUTH, data });

//     navigate('/listener');
//   } catch (error : any) {
//     return error.response.data.message;
//   }
// };

// export const signup = (formData : any, navigate : any) => async (dispatch : any) => {
//   try {
//     const { data } = await api.signUp(formData);

//     dispatch({ type: AUTH, data });

//     navigate('/listener');
//   } catch (error : any) {
//     return error.response.data.message;
//   }
// };