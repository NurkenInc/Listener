import { Link, useNavigate, useParams } from "react-router-dom";
import react, { useEffect, useState } from 'react';
import { getDeck } from "../../api";
import { Card, TDeck } from "../../api/getDecks";
import LoaderSquare from "../Loaders/LoaderSquare";

export default function FolderLayout() {
    const [cards, setCards] = useState<Card[]>();    
    const [deckName, setDeckName] = useState<string>()
    const [loading, setLoading] = useState(false);

    const {deckId} = useParams<string>();

    const history = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function fetchDeck() {
            const deck = await getDeck(deckId!);
            setDeckName(deck.title);
            setCards(deck.cards);
        }
        fetchDeck().then(() => setLoading(false));
    }, [deckId])
    
    return (        
        <>
            <div className="w-[100vw]">
                <h2 className="text-left ml-5 md:ml-20 font-bold text-black italic mt-[15px] md:mt-0 text-[50px]">{deckName}</h2>
                <p className="text-left ml-5 md:ml-20 italic text-gray-600 text-[17px] mt-[25px]">Hi it's your folder named {deckName}<br />You can edit it by click to the note at table<br />If you want to add new note you can use sidebar</p>
            </div>
                {
                    loading === true ? 
                    <div className="mt-[15px] md:mt-[45px]">
                        <LoaderSquare />
                    </div>
                    :
                    <div className="w-[95vw] mt-[25px] md:mt-[50px] relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                    {cards?.map((card, index) => (
                                        <tr onClick={() => {history(`/decks/${deckId}/cards/${index}`, {state: {cardData: card}})}} className="bg-white text-center border-b cursor-pointer dark:bg-gray-900 dark:border-gray-700" key={index}>
                                            <th scope="row" className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {card.name}
                                            </th>
                                            <td className="px-2 md:px-6 py-4">
                                                {card.description}
                                            </td>
                                            <td className="px-2 md:px-6 py-4">
                                                {card.status}
                                            </td>
                                            <td className="px-2 md:px-6 py-4">
                                                {card.deadline === null ? 'Unset' : card.deadline.toString().slice(0,10)}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                }    
        </>
    );
}