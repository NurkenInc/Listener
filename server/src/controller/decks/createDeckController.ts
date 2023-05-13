import clerk from '../../middleware/clerk';

import Deck from '../../models/Deck';

async function createDeckController (req: any, res: any) {
  const { userId } = req.auth;
  const title = req.body.title;

  try {
    const newDeck = new Deck({
      creator: userId,
      createdAt: new Date().toISOString(),
      title: title,
      cards: []
    });
    
    const createdDeck = await newDeck.save();
    
    res.status(201).json(createdDeck);

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default createDeckController;