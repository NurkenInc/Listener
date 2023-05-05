import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusDropdown from "../../components/StatusDropdown/StatusDropdown";
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLocation, useParams } from "react-router-dom";
import { faCheck, faXmark, faClock, faNoteSticky, faCalendarDays, faInfo, faPencilSquare, faPencil, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Typography } from "antd";

export default function GetStarted() {
    const navigate = useNavigate();
    const [cardDeadline, setCardDeadline] = useState<Date | null>(new Date());
    const [cardDescirpion, setCardDescription] = useState<string>('Make project presentation');
    const [cardAddInfo, setCardAddInfo] = useState<string>('Presentation should be at least with 7 slides');

    const setCardStatus = (status : string) => {

    }

    return (
        <div className='w-full'>
            <div className='md:ml-[35px]'>
                <div className='ml-[15px] md:ml-0'>
                    <h1 className='md:text-[50px] text-[40px]'>Get Started</h1>
                </div>
                <div className='flex justify-center'>
                    <p className='flex-col gradient_01 justify-between items-center gap-36 w-[95vw] rounded-[15px] py-[20px] my-[25px] px-4'>
                        Hi! If you're new here you can read this <span className='font-bold text-blue-500'>Listener</span> platform
                        you check this short tutorial!
                    </p>
                </div>
                <h2 className='md:mt-[35px] mt-[5px] text-left ml-[10px] md:ml-0 font-bold md:text-[25px] text-[20px]'>First of all! How about making your first Folder?</h2>
                <div className='flex justify-center'>
                    <p className='flex-col gradient_01 justify-between items-center gap-36 w-[95vw] rounded-[15px] py-[20px] my-[25px] px-4 text-[15px] md:text-[25px]'>
                        That's might be quite confusing but first of all to take note you should create a folder with whatever name you want!
                        <br/>
                        After you can make your first note by clicking a "+" icon on the middle right of your sidebar!
                    </p>
                </div>
                <div className='mt-[55px]'>
                    <>
                        <div className="w-[80vw] mx-0">
                            <h2 className="text-left ml-5 md:ml-20 font-bold text-black italic mt-[-35px] md:mt-0 text-[50px]">Project</h2>
                            <p className="text-left ml-5 md:ml-20 italic text-gray-600 text-[17px] mt-[25px]">Hi it's example folder named Project<br />If you want to add new note you can use sidebar</p>
                        </div>
                            <div className="w-[95vw] mt-[25px] md:mt-[50px] relative overflow-x-auto shadow-md sm:rounded-lg z-[-25]">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr className="text-center">
                                            <th scope="col" className="px-2 md:px-6 py-3">
                                                Note Name
                                            </th>
                                            <th scope="col" className="px-2 md:px-6 py-3">
                                                Description
                                            </th>
                                            <th scope="col" className="px-2 md:px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" className="px-2 md:px-6 py-3">
                                                Deadline
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr className="bg-white text-center border-b cursor-pointer dark:bg-gray-900 dark:border-gray-700" key={0}>
                                                <th scope="row" className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Presentation
                                                </th>
                                                <td className="px-2 md:px-6 py-4">
                                                    In Progress
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    {new Date().toString().slice(0,10)}
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    Make project presentation
                                                </td>
                                            </tr>
                                            <tr className="bg-white text-center border-b cursor-pointer dark:bg-gray-900 dark:border-gray-700" key={1}>
                                                <th scope="row" className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    App
                                                </th>
                                                <td className="px-2 md:px-6 py-4">
                                                    Done
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    {new Date().toString().slice(0,10)}
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    Fix bugs of project app
                                                </td>
                                            </tr>
                                            <tr className="bg-white text-center border-b cursor-pointer dark:bg-gray-900 dark:border-gray-700" key={2}>
                                                <th scope="row" className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Speech text
                                                </th>
                                                <td className="px-2 md:px-6 py-4">
                                                    Not done
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    {new Date().toString().slice(0,10)}
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    Make project project contest speech text to 2 min
                                                </td>
                                            </tr>
                                            <tr className="bg-white text-center border-b cursor-pointer dark:bg-gray-900 dark:border-gray-700" key={3}>
                                                <th scope="row" className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    Future plan
                                                </th>
                                                <td className="px-2 md:px-6 py-4">
                                                    In Progress
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    {new Date().toString().slice(0,10)}
                                                </td>
                                                <td className="px-2 md:px-6 py-4">
                                                    Make project future planning
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                    </>
                </div>
                <div className='flex justify-center'>
                    <div className='flex-col gradient_01 justify-between items-center gap-36 w-[95vw] rounded-[15px] py-[20px] my-[25px] px-4'>
                        <p className='font-bold text-[20px] md:text-[25px] leading-[35px]'>
                            Above you can see Folder cards information where you can track 
                            progress of each note or task see deadlines and description of task!
                        </p>
                    </div> 
                </div>
                <div className='flex justify-center py-[25px]'>
                    <div className="relative md:w-[70vw] w-auto h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create note form</h3>
                                <form className="space-y-6" action="#">
                                    <div>
                                        <label htmlFor="noteName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note name</label>
                                        <input type="text" name="noteName" id="noteName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="noteDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note description(optional)</label>
                                        <input type="text" name="noteDescription" id="noteDescription" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                    </div>
                                    <div>
                                        <label htmlFor="addInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Additional information(optional)</label>
                                        <input type="text" name="addInfo" id="addInfo" placeholder="Additional info..." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                    </div>
                                    <p>Choose status(optional)</p>
                                    <StatusDropdown onClick={setCardStatus} />
                                    <p>Choose date(optional)</p>
                                    <div>
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
                                        <button id="submitButton" className="md:mr-[70px] text-white bg-[#3982f7] hover:#2473f2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='flex-col gradient_01 justify-between items-center gap-36 w-[95vw] rounded-[15px] py-[20px] my-[25px] px-4'>
                        <p className='font-bold md:text-[25px] text-[15px] md:leading-[35px] leading-[25px]'>
                            After clicking plus icon at sidebar we can see this note creation window <br />
                            Just enter the information about your note and click 'Submit'
                        </p>
                        <p className='mt-[10px] md:text-[25px] text-[15px]'>
                            Few seconds later you can see that your note popped out on the sidebar<br />
                            below the folder where you created your note and if you click on the Folder you can see your note short info!
                        </p>
                    </div> 
                </div>
                <div className='py-[25px]'>
                    <div className="w-[100vw]">
                        <h2 className="text-left ml-5 md:ml-20 font-bold text-gray-500 text-[50px]">📘</h2>
                        <p className="text-left ml-5 md:ml-20 italic text-gray-400 md:text-[17px] text-[15px] mt-[25px]">This is example note named Project<br />You can see note status, deadline, and info. Maybe... You haven't finished your task so... Deadline's close!<br />Stay focused with us!</p>
                        <div className="flex flex-col items-center justify-center mt-7">
                            <div className="md:w-[90vw] w-[95vw] p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between">
                                    <h2 className="text-left ml-0 sm:ml-20 sm:mt-0 font-bold text-gray-500 text-[45px]">
                                        <FontAwesomeIcon icon={faNoteSticky} className='text-black mr-[15px]'/>
                                        <p className="mt-[25px] sm:mt-[-30px] ml-0 sm:ml-[45px]">
                                            Project
                                        </p>
                                    </h2>
                                    <div className="text-right italic text-gray-600 mr-0 sm:mr-[20px]">{
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                label={<p><FontAwesomeIcon icon={faCalendarDays} className='text-black mr-[3px]'/>Set deadline</p>}
                                                inputFormat="YYYY-MM-DD"
                                                value={cardDeadline}
                                                onChange={(value) => {setCardDeadline(value); }}
                                                renderInput={(params) => <TextField {...params} />}
                                                />
                                        </LocalizationProvider>
                                    }</div>
                                </div>
                                <div className="flex sm:flex-row flex-col gap-10">
                                    <div className="mt-[25px] md:w-[70%] text-left p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <h2 className="font-bold text-gray-500 text-[25px] mb-4"><FontAwesomeIcon icon={faInfo} className='h-[22px] text-black mr-[15px]'/>Description</h2>
                                        <Typography.Paragraph editable={{onChange(value) {
                                            setCardDescription(value);
                                        }}} className="text-[17px]">
                                            {cardDescirpion}
                                        </Typography.Paragraph>
                                    </div>
                                    <div className="mt-[-15px] sm:mt-[25px] md:w-[25%] text-left p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <h2 className="font-bold text-gray-500 text-[25px] mb-4 text-center">Status</h2>
                                        <StatusDropdown onClick={setCardStatus}/>
                                    </div>
                                </div>
                                <div className="mt-[25px] w-full text-left p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <h2 className="font-bold text-gray-500 text-[25px] mb-4">Additional info</h2>
                                        <Typography.Paragraph editable={{onChange(value) {
                                            setCardAddInfo(value);
                                        }}} className="text-[17px]">{cardAddInfo}</Typography.Paragraph>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='flex-col gradient_01 justify-between items-center gap-36 w-[95vw] rounded-[15px] py-[20px] my-[25px] px-4'>
                        <p className='font-bold md:text-[25px] text-[15px] md:leading-[35px] leading-[25px]'>
                            Now you can see note information card, information card of course have <br />
                            information about deadlines,  description, additional information and note name
                        </p>
                        <p className='mt-[10px] md:text-[18px] text-[15px]'>
                            If you wish to edit that information you can edit it right here!<br />
                            After editing information "Update" button will pop out in the bottom of note information card. <br />
                            Just click it and information will automatically save on our servers!
                        </p>
                        <p className='mt-[35px] text-[35px] font-bold'>
                            Good luck!
                        </p>
                    </div> 
                </div>
            </div>
        </div>
    )
}