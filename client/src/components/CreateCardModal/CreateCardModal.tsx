import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

// there was props
export default function CreateCardModal() {
    const [cardName, setCardName] = useState('');    
    const [cardDescription, setCardDescription] = useState('');    
    const [cardAddInfo, setCardAddInfo] = useState('');    
    const [cardStatus, setCardStatus] = useState('');    
    const [cardDeadline, setCardDeadline] = useState<Date | null>(null);    

    const { deckId } = useParams<string>();

    const handleSubmit = async () => {
        const card = {
            name: cardName || 'Untitled',
            description: cardDescription || 'Untitled',
            deadline: cardDeadline || null,
            status: cardStatus || 'Untitled',
            additionalInfo: cardAddInfo || 'Untitled',
        }
        props.handleOnSubmit(deckId, card);
    }

    return (
                <div className="relative md:w-[70vw] w-auto h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create note form</h3>
                            <form className="space-y-6" action="#">
                                <div>
                                    <label htmlFor="noteName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note name</label>
                                    <input onChange={(event) => {setCardName(event.target.value)}} type="text" name="noteName" id="noteName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required />
                                </div>
                                <div>
                                    <label htmlFor="noteDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note description(optional)</label>
                                    <input onChange={(event) => {setCardDescription(event.target.value)}} type="text" name="noteDescription" id="noteDescription" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                </div>
                                <div>
                                    <label htmlFor="addInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional information(optional)</label>
                                    <input onChange={(event) => {setCardAddInfo(event.target.value)}} type="text" name="addInfo" id="addInfo" placeholder="Additional info..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                </div>
                                <p>Choose status(optional)</p>
                                <StatusDropdown onClick={setCardStatus} />
                                <p>Choose date(optional)</p>
                                <div>
                                    {/* <DatePicker minDate={new Date()} onChange={(date : Date) => {setCardDeadline(date)}}/> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label="Pick deadline date"
                                        inputFormat="YYYY-MM-DD"
                                        value={cardDeadline}
                                        onChange={(value) => {setCardDeadline(value)}}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="flex justify-center items-center gap-4">
                                    <img src="shiba-sticker.gif" alt="shiba dog gif" className="w-[50px] h-[50px]" />
                                    <Link to={'/listener'}><button onClick={handleSubmit} id="submitButton" className="md:mr-[70px] text-white bg-[#3982f7] hover:#2473f2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Submit</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
    );
}