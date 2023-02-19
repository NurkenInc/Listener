import { API_URL } from "./config";

export async function deleteDeck(deckId: string) {
    await fetch(`${API_URL}/decks/${deckId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`,
        },
    });
}