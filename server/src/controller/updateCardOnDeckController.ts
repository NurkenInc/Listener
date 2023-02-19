import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function updateCardOnDeckController (req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if(!deck) return res.status(400).send("no deck of this id exists");
    const newCards = req.body.cards;
    deck.cards = newCards;
    await deck.save();
    res.json(deck);
}