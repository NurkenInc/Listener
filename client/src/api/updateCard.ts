import { API_URL } from "./config";
import { TDeck, Card } from "./getDecks";

export async function updateCard(deckId: string, cards: Card[], index: number) {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`,
    },
        body: JSON.stringify({cards})
    });
    return response.json();
}