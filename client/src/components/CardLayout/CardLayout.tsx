import { useLocation, useParams } from "react-router-dom";
import { faCheck, faXmark, faClock, faNoteSticky, faCalendarDays, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { updateCard } from "../../api/updateCard";
import { getDeck } from "../../api/getDeck";
import { Card, getDecks } from "../../api/getDecks";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import LoaderSquare from "../Loaders/LoaderSquare";

function CardLayout() {
    const location = useLocation();
    const [dropdownActive, setDropdownActive] = useState(false);
    const [status, setStatus] = useState<string>('');
    const [addInfo, setAddInfo] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    const [card, setCard] = useState<Card | null>(null);
    const [loading, setLoading] = useState(false);

    const {deckId, index} = useParams<string>();

    const fetchCard = async () => {
        const deck = await getDeck(deckId!);
        setCard(deck!.cards[parseInt(index!)]); 
    }

    useEffect(() => {
        setLoading(true);
        async function fetchCard() {
            const deck = await getDeck(deckId!); 
            setStatus(deck!.cards[parseInt(index!)].status);
            setAddInfo(deck!.cards[parseInt(index!)].additionalInfo);
            setDeadline(deck!.cards[parseInt(index!)].deadline);
            setDescription(deck!.cards[parseInt(index!)].description); 
            deck!.cards[parseInt(index!)]; 
        }
        fetchCard().then(() => setLoading(false));
    }, [deckId, index])

    const handleSetStatus = (statusValue : string) => {
        setDropdownActive(false);
        setStatus(statusValue);
    }

    const handleSubmit = async () => {
        const card = {
            name: location.state.cardData.name,
            description: description,
            deadline: deadline || location.state.cardData.deadline,
            status: status,
            additionalInfo: addInfo,
        };
        const decks = await getDecks();
        const deck = decks.find(x => x._id === deckId);
        deck!.cards[parseInt(index!)] = card;
        await updateCard(deckId!, deck!.cards, parseInt(index!));
    }

    return (
        <div className="w-[100vw]">
            <h2 className="text-left ml-5 md:ml-20 font-bold text-gray-500 text-[50px]">📘</h2>
            <p className="text-left ml-5 md:ml-20 italic text-gray-400 text-[17px] mt-[25px]">This is your note named {location.state.cardData.name}<br />You can see note status, deadline, and info. Maybe... You haven't finished your task so... Deadline's close!<br />Stay focused with us!</p>
            {
                loading === true ?
                <div className="flex flex-col items-center mt-10">
                    <LoaderSquare /> 
                </div>
                :
                <div className="flex flex-col items-center justify-center mt-7">
                    <div className="md:w-[90vw] w-[95vw] p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-between">
                            <h2 className="text-left ml-0 sm:ml-20 sm:mt-0 font-bold text-gray-500 text-[45px]">
                                <FontAwesomeIcon icon={faNoteSticky} className='text-black mr-[15px]'/>
                                <p className="mt-[25px] sm:mt-[-30px] ml-0 sm:ml-[45px] whitespace-nowrap">
                                    {location.state.cardData.name}
                                </p>
                            </h2>
                            <div className="text-right italic text-gray-600 mr-0 sm:mr-[20px]">{
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        label={<p><FontAwesomeIcon icon={faCalendarDays} className='text-black mr-[3px]'/>Set deadline</p>}
                                        inputFormat="YYYY-MM-DD"
                                        value={deadline}
                                        onChange={(value) => {setDeadline(value); setNeedToUpdate(true);}}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                                </LocalizationProvider>
                            }</div>
                        </div>
                        <div className="flex sm:flex-row flex-col gap-10">
                            <div className="mt-[25px] md:w-[70%] text-left p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="font-bold text-gray-500 text-[25px] mb-4"><FontAwesomeIcon icon={faInfo} className='h-[22px] text-black mr-[15px]'/>Description</h2>
                                <Typography.Paragraph editable={{onChange(value) {
                                    setDescription(value);
                                    setNeedToUpdate(true);
                                },}} className="text-[17px]">
                                    {description === 'Untitled' ? 'Oh! I think that you have not set description, so how about this smile 😁😉😊😂🤣😘😍💖' : description}
                                </Typography.Paragraph>
                            </div>
                            <div className="mt-[-15px] sm:mt-[25px] md:w-[25%] text-left p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="font-bold text-gray-500 text-[25px] mb-4 text-center">Status</h2>
                                <div>
                                    <button onClick={() => setDropdownActive((dropdownActive) => !dropdownActive)} id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" className="text-black bg-white font-medium rounded-lg px-4 py-2.5 hover:border-black text-center inline-flex items-center" type="button">{<div>{status === 'Done' ? <FontAwesomeIcon icon={faCheck} className='text-green-500 h-[20px] w-[20px]'/> : status === 'In Progress' ? <FontAwesomeIcon icon={faClock} className='text-yellow-400 h-[20px] w-[20px]'/> : status === 'Not done' ? <FontAwesomeIcon icon={faXmark} className='text-red-600 h-[20px] w-[20px]' /> : <></>}<p className='inline-block ml-[10px]'>{status === 'Untitled' ? 'Set Status' : status}</p></div>}</button>
                                    {dropdownActive === true ? <div id="dropdownUsers" className="z-10 bg-white rounded shadow w-auto dark:bg-gray-700">
                                        <ul className="h-auto py-1 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                            <li onClick={() => {handleSetStatus('Done');  setNeedToUpdate(true)}} className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                <FontAwesomeIcon icon={faCheck} className='text-green-500 h-[20px] w-[20px]' />
                                                Done
                                            </li>
                                            <li onClick={() => {handleSetStatus('In Progress'); setNeedToUpdate(true)}} className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                <FontAwesomeIcon icon={faClock} className='text-yellow-400 h-[20px] w-[20px]' />
                                                In Progress
                                            </li>
                                            <li onClick={() => {handleSetStatus('Not done'); setNeedToUpdate(true)}} className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                <FontAwesomeIcon icon={faXmark} className='text-red-600 h-[20px] w-[20px]' />
                                                Not done
                                            </li>
                                        </ul>
                                    </div> : <></>}
                                </div>
                            </div>
                        </div>
                        <div className="mt-[25px] w-full text-left p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="font-bold text-gray-500 text-[25px] mb-4">Additional info</h2>
                                <Typography.Paragraph editable={{onChange(value) {
                                    setAddInfo(value);
                                    setNeedToUpdate(true);
                                },}} className="text-[17px]">{addInfo === 'Untitled' ? 'Additional info is absent sorry...' : addInfo}</Typography.Paragraph>
                        </div>
                    {
                        needToUpdate === true 
                        ?
                        <div className="flex justify-center">
                            <button 
                                onClick={() => {handleSubmit(); setNeedToUpdate(false);}} 
                                type="button"
                                className="text-white mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center mr-2 mb-2"
                                >
                                Update
                            </button> 
                        </div> 
                        : 
                        <></>
                    }
                    </div>
                </div>
            }
        </div>
    );
}

export default CardLayout