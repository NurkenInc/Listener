import { config } from 'dotenv';
config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './src/models/Deck';
import { getDecksController } from './src/controller/getDecksController';
import { createDeckController } from './src/controller/createDeckController';
import { deleteDeckController } from './src/controller/deleteDeckController';
import { getDeckController } from './src/controller/getDeckController';
import { createCardForDeckController } from './src/controller/createCardForDeckController';
import { deleteCardOnDeckController } from './src/controller/deleteCardOnDeckController';
import { updateDeckController } from './src/controller/updateDeckController';
import { updateCardOnDeckController } from './src/controller/updateCardOnDeckController';
import auth from './src/middleware/auth';

import userRoutes from './src/routes/users';
import { verifyOTPController } from './src/controller/verifyOTPController';
import { resendOTPVerificationCode } from './src/controller/resendOTPVerificationCode';

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


