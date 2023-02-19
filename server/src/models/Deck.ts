import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
    creator: String,
    title: String,
    cards: [
        {
            name: String,
            description: String,
            deadline: Date,
            status: String,
            additionalInfo: String,
        }
    ],
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;