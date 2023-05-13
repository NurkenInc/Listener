import { Request, Response } from 'express';
import Deck from '../../models/Deck';

async function updateDeckController (req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = req.body;
  
  try {
    const newDeck = await Deck.findByIdAndUpdate(deckId, { ...deck }, { new: true });
    
    res.status(200).json(newDeck);
    
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default updateDeckController;