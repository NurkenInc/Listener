import { Request, Response } from 'express';
import Deck from '../../models/Deck';

async function updateCardOnDeckController (req: Request, res: Response) {  
  const deckId = req.params.deckId;
  const cardId = req.params.cardId;

  const newCard = req.body.card;

  try {
    const deck = await Deck.findById(deckId);
    
    if(!deck) {
      return res.status(400).send("Deck with that id doesn't exist");
    }

    deck.cards.filter((card) => 
      card.id === cardId ? { ...card, ...newCard } : card);
    
    await deck.save();
    
    res.status(200).json(deck);

  } catch (error) {
    res.status(404).json({ message: error.messgae })
  }
}

export default updateCardOnDeckController;