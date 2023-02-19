import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function updateDeckController (req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = req.body;
    const newDeck = await Deck.findByIdAndUpdate(deckId, deck);
    res.json(newDeck);
}