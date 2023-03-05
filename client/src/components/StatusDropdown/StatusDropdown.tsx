import { faCheck, faXmark, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function StatusDropdown(props: any) {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [status, setStatus] = useState("");

    function handleSetStatus(statusValue: string) {
        setDropdownActive(false);
        setStatus(statusValue);
    }

    return (
        <div>
            <button
                style={{
                    backgroundColor:
                        status === "Done"
                            ? "green"
                            : status === "In Progress"
                            ? "#facc75"
                            : status === "Not done"
                            ? "red"
                            : "#3982f7",
                }}
                onClick={() =>
                    setDropdownActive((dropdownActive) => !dropdownActive)
                }
                id='dropdownUsersButton'
                data-dropdown-toggle='dropdownUsers'
                data-dropdown-placement='bottom'
                className='text-white bg-[#3982f7] hover:#2473f2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='button'
            >
                {
                    <div>
                        {status === "Done" ? (
                            <FontAwesomeIcon icon={faCheck} />
                        ) : status === "In Progress" ? (
                            <FontAwesomeIcon icon={faClock} />
                        ) : (
                            <FontAwesomeIcon icon={faXmark} />
                        )}
                        <p className='inline-block ml-[10px]'>
                            {status === "" ? "Set Status" : status}
                        </p>
                    </div>
                }
            </button>
            {dropdownActive === true ? (
                <div
                    id='dropdownUsers'
                    className='z-10 bg-white rounded shadow w-auto dark:bg-gray-700'
                >
                    <ul
                        className='h-auto py-1 overflow-y-auto text-gray-700 dark:text-gray-200'
                        aria-labelledby='dropdownUsersButton'
                    >
                        <li
                            onClick={() => {
                                handleSetStatus("Done");
                                props.onClick("Done");
                            }}
                            className='flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className='text-green-500 h-[20px] w-[20px]'
                            />
                            Done
                        </li>
                        <li
                            onClick={() => {
                                handleSetStatus("In Progress");
                                props.onClick("In Progress");
                            }}
                            className='flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                            <FontAwesomeIcon
                                icon={faClock}
                                className='text-yellow-400 h-[20px] w-[20px]'
                            />
                            In Progress
                        </li>
                        <li
                            onClick={() => {
                                handleSetStatus("Not done");
                                props.onClick("Not done");
                            }}
                            className='flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                className='text-red-600 h-[20px] w-[20px]'
                            />
                            Not done
                        </li>
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
