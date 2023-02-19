import { API_URL } from "./config";

export type Card = {
    name: string,
    description: string,
    deadline: Date,
    status: string,
    additionalInfo: string,
} 

export type TDeck = {
    creator: string;
    title: string;
    cards: Card[];
    _id: string;
}

export async function getDecks(): Promise<TDeck[]> { 
    const response = await fetch(`${API_URL}/decks`,{
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`,
        },
    });
    return response.json();
}

