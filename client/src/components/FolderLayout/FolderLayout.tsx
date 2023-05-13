import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import { useAppDispatch, useAppSelector } from '@hook/redux';

import { getDeck } from "@/actions/decks";
import LoaderSquare from "@/components/Loaders/LoaderSquare";

// todo maybe give info about deck via props onclick to make less server requests
export default function FolderLayout() {
  const { isLoading, error, currentDeck } = useAppSelector((state : any) => state.decks)
  const { deckId } = useParams<string>();
  const { getToken } = useAuth();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTableRowsClick = (card : any) => {
    navigate(`/decks/${deckId}/cards/${card.id}`, { state: { cardData: card } });
  }

  const formatDeadline = (deadline : any) => {
    return deadline ? deadline.toString().slice(0, 10) : "Unset";
  }

  const fetchDeck = async () => {
    const token = await getToken({ template: 'long_session' });
    dispatch(getDeck(token!, deckId!));
  }

  useEffect(() => {
    fetchDeck();
  }, []);

  return (
    <>
      <div className='w-[100vw]'>
        <h2 className='text-left ml-5 md:ml-20 font-bold text-black italic mt-[15px] md:mt-0 text-[50px]'>
            {currentDeck.title}
        </h2>
        <p className='text-left ml-5 md:ml-20 italic text-gray-600 text-[17px] mt-[25px]'>
            Hi it's your folder named {currentDeck.title}
            <br />
            You can edit it by click to the note at table
            <br />
            If you want to add new note you can use sidebar
        </p>
      </div>
      {
        isLoading ? (
          <div className='mt-[15px] md:mt-[45px]'>
              <LoaderSquare />
          </div>
        ) : (
          <div className='w-[95vw] mt-[25px] md:mt-[50px] relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr className='text-center'>
                    <th scope='col' className='px-2 md:px-6 py-3'>
                      Note Name
                    </th>
                    <th scope='col' className='px-2 md:px-6 py-3'>
                      Description
                    </th>
                    <th scope='col' className='px-2 md:px-6 py-3'>
                      Status
                    </th>
                    <th scope='col' className='px-2 md:px-6 py-3'>
                      Deadline
                    </th>
                </tr>
              </thead>
              <tbody>
                {
                  currentDeck.cards.map((card : any, index : number) => (
                    <tr
                        onClick={() => { handleTableRowsClick(card) }} key={index}
                        className='bg-white text-center border-b cursor-pointer dark:bg-gray-900 dark:border-gray-700'
                    >
                      <th
                        scope='row'
                        className='px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        {card.name}
                      </th>
                      <td className='px-2 md:px-6 py-4'>
                        {card.description}
                      </td>
                      <td className='px-2 md:px-6 py-4'>
                        {card.status}
                      </td>
                      <td className='px-2 md:px-6 py-4'>
                        {formatDeadline(card.deadline)}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }
    </>
  );
}