import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/Deck';
import { getDecksController } from './controller/getDecksController';
import { createDeckController } from './controller/createDeckController';
import { deleteDeckController } from './controller/deleteDeckController';
import { getDeckController } from './controller/getDeckController';
import { createCardForDeckController } from './controller/createCardForDeckController';
import { deleteCardOnDeckController } from './controller/deleteCardOnDeckController';
import { updateDeckController } from './controller/updateDeckController';
import { updateCardOnDeckController } from './controller/updateCardOnDeckController';
import auth from './middleware/auth';

import userRoutes from './routes/users';
import { verifyOTPController } from './controller/verifyOTPController';
import { resendOTPVerificationCode } from './controller/resendOTPVerificationCode';

const PORT = 5000;

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.get('/decks',auth, getDecksController);
app.post('/decks', auth, createDeckController);
app.put("/decks/:deckId", auth, updateDeckController);
app.delete('/decks/:deckId', auth, deleteDeckController);
app.get('/decks/:deckId', auth, getDeckController);
app.post("/decks/:deckId/cards", auth, createCardForDeckController);
app.put("/decks/:deckId/cards/:index", auth, updateCardOnDeckController);
app.delete("/decks/:deckId/cards/:index", auth, deleteCardOnDeckController);
app.post('/verifyOTP', verifyOTPController);
app.post('/resendOTPVerificationCode', resendOTPVerificationCode);

app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
});


