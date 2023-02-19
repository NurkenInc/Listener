import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function createCard(deckId: string, card: object): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: 'POST',
        body: JSON.stringify({
            card,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`,
        },
    });
    return response.json();
}