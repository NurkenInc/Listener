import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function updateDeck(deckId: string, deck: TDeck) {
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`,
    },
        body: JSON.stringify(deck)
    });
    return response.json();
}