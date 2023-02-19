import React, { useEffect, useState } from 'react';
import { createCard } from '../../api/createCard';
import { deleteCard } from '../../api/deleteCard';
import { useParams } from 'react-router-dom';
import { TDeck } from '../../api/getDecks';
import { getDeck } from '../../api/getDeck';
import './Deck.css';

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState('');
  const { deckId } = useParams();

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
 }

 async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index); 
    setCards(newDeck.cards);
 } 

  useEffect(() => {
      async function fetchDeck() {
        if (!deckId) return;  
        const newDeck = await getDeck(deckId);
        setDeck(newDeck);
        setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return <div className="App">
        <ul className="cards">
            {cards.map((card, index) => (
                <li key={index}>
                    <button onClick={() => handleDeleteCard(index)}>X</button>
                    {card}
                </li>
            ))
            }
        </ul>
        <form onSubmit={handleCreateCard}>
            <label htmlFor="card-text">Card text</label>
            <input id="card-text" 
                type="text"
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    {
                        setText(e.target.value);
                    }
                }
            />
            <button>Create Card</button>
        </form>
    </div>;
}