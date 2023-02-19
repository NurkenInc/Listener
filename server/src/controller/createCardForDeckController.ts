import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function createCardForDeckController (req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if(!deck) return res.status(400).send("no deck of this id exists");
    const note = {
            name: req.body.card.name,
            description: req.body.card.description,
            deadline: req.body.card.deadline,
            status: req.body.card.status,
            additionalInfo: req.body.card.additionalInfo,
    };
    deck.cards.push(note);
    await deck.save();
    res.json(deck);
}