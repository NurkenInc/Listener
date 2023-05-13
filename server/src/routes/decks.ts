import express from 'express';

import {
  createCardForDeckController,
  createDeckController,
  deleteCardOnDeckController,
  deleteDeckController,
  getDeckController,
  getDecksController,
  updateCardOnDeckController,
  updateDeckController,
} from '../controller/decks'
import clerk from '../middleware/clerk';

const router = express.Router();

router.get('/', clerk.expressWithAuth(), getDecksController);
router.post('/', clerk.expressWithAuth(), createDeckController);
router.patch('/:deckId', clerk.expressWithAuth(), updateDeckController);
router.delete('/:deckId', clerk.expressWithAuth(), deleteDeckController);
router.get('/:deckId', clerk.expressWithAuth(), getDeckController);
router.post("/:deckId/cards", clerk.expressWithAuth(), createCardForDeckController);
router.patch("/:deckId/cards/:cardId", clerk.expressWithAuth(), updateCardOnDeckController);
router.delete("/:deckId/cards/:cardId", clerk.expressWithAuth(), deleteCardOnDeckController);
// router.post('/verifyOTP', verifyOTPController);
// router.post('/resendOTPVerificationCode', resendOTPVerificationCode);

export default router;