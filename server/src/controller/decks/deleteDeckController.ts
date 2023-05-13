import { Request, Response } from 'express';
import Deck from '../../models/Deck';

async function deleteDeckController (req: Request, res: Response) {
  const deckId = req.params.deckId;

  try {
    const deck = await Deck.findByIdAndDelete(deckId);
    
    res.status(200).json(deck);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default deleteDeckController;