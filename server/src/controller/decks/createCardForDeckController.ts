import { Request, Response } from 'express';

import Deck from '../../models/Deck';

async function createCardForDeckController (req: Request, res: Response) {
  const deckId = req.params.deckId;
  const card = req.body.card;

  try {
    const deck = await Deck.findById(deckId);

    if(!deck) {
      return res.status(400).send("Deck with that id doesn't exist");
    }

    deck.cards.push(card);
    await deck.save();
    res.status(201).json(deck);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default createCardForDeckController;