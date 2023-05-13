// import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from '@/hooks/redux';
import { useAuth } from '@clerk/clerk-react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import StatusDropdown from "../StatusDropdown/StatusDropdown";
// import TextField from '@mui/material/TextField';
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"

import { createCard } from '@/actions/cards';

const initialState = {
  name: 'Untitled',
  description: 'Untitled',
  additionalInfo: 'Untitled',
  status: 'Untitled',
  deadline: null,
}

// there was props
const CreateCardModal = () => {
  // const [cardName, setCardName] = useState('');    
  // const [cardDescription, setCardDescription] = useState('');    
  // const [cardAddInfo, setCardAddInfo] = useState('');    
  // const [cardStatus, setCardStatus] = useState('');    
  // const [cardDeadline, setCardDeadline] = useState<Date | null>(null);    
  const [card, setCard] = useState<any>(initialState);

  const { deckId } = useParams<string>();
  const { getToken } = useAuth();

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    // props.handleOnSubmit(deckId, card); // redux do not take from props
    // submit
    const token = await getToken({ template: 'long_session' })
    dispatch(createCard(card, deckId!, token!));
  }

  const handleChange = (e : any) => {
    setCard({ ...card, [e.targer.name]: e.target.value });
  }

  return (
    <div className="relative md:w-[70vw] w-auto h-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create note form</h3>
          <form className="space-y-6" action="#">
            <div>
              <label htmlFor="noteName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Note name
              </label>
              <input onChange={handleChange} type="text" name="name" id="noteName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required />
              {/* rewrite */}
            </div>
            <div>
              <label htmlFor="noteDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Note description(optional)
              </label>
              <input onChange={handleChange} type="text" name="description" id="noteDescription" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
              {/* rewrite */}
            </div>
            <div>
              <label htmlFor="addInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Additional information(optional)
              </label>
              <input onChange={handleChange} type="text" name="additionalInfo" id="addInfo" placeholder="Additional info..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
              {/* rewrite */}
            </div>
            <p>Choose status(optional)</p>
            {/* <StatusDropdown onClick={setCardStatus} /> */}
            {/* rewrite */}
            <p>Choose date(optional)</p>
            <div>
                {/* <DatePicker minDate={new Date()} onChange={(date : Date) => {setCardDeadline(date)}}/> */}
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Pick deadline date"
                    inputFormat="YYYY-MM-DD"
                    value={cardDeadline}
                    onChange={(value) => {setCardDeadline(value)}}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                {/* // rewrite */}
            </div>
            <div className="flex justify-center items-center gap-4">
                <img src="shiba-sticker.gif" alt="shiba dog gif" className="w-[50px] h-[50px]" />
                <Link to={'/listener'}>
                  <button onClick={handleSubmit} id="submitButton" className="md:mr-[70px] text-white bg-[#3982f7] hover:#2473f2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                  {/* rewrite */}
                    Submit
                  </button>
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div> 
  );
}

export default CreateCardModal;