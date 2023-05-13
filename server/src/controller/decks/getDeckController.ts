import { Request, Response } from 'express';
import Deck from '../../models/Deck';

async function getDeckController(req: Request, res: Response) {
    const { deckId } = req.params;
    
    try {
      const deck = await Deck.findById(deckId);
      
      res.status(200).json(deck);
    
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
}

export default getDeckController;