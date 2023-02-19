import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function getDeck(deckId: string): Promise<TDeck> { 
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`,
        },
    });
    return response.json();
}