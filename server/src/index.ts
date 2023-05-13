import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import deckRoutes from './routes/decks'

config();
// import userRoutes from './routes/users';
// import { verifyOTPController } from './controller/verifyOTPController';
// import { resendOTPVerificationCode } from './controller/resendOTPVerificationCode';

const PORT = 5000;

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(express.json());

// app.use('/user', userRoutes);
app.use('/decks', deckRoutes);

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Server running on port ${PORT}`);
    app.listen(PORT);
});