import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  creator: String,
  createdAt: Date,
  title: String,
  cards: [
      {
        id: ObjectId,
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