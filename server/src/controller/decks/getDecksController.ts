import Deck from '../../models/Deck';

async function getDecksController(req: any, res: any) {
  const { userId } = req.auth;

  try {
    const decks = await Deck.find({ creator: userId });
    
    res.status(200).json(decks);
  
  } catch (error) {
    res.status(404).json({ message: error.messgae });
  }
}

export default getDecksController;