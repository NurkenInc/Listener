import { Request, Response } from 'express';
import Deck from '../../models/Deck';

async function deleteCardOnDeckController (req: Request, res: Response) {
  const deckId = req.params.deckId;
  const cardId = req.params.cardId;

  try {
    const deck = await Deck.findById(deckId);
    
    if(!deck) {
      return res.status(400).send("Deck with that id doesn't exist");
    }

    deck.cards.filter((card) => card.id !== cardId);
    
    await deck.save();
    
    res.status(200).json(deck);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default deleteCardOnDeckController;