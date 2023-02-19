import { json } from "react-router-dom";
import { API_URL } from "./config";

export async function createDeck(title: string) {
    const userId = JSON.parse(localStorage.getItem('profile')!).result._id;
    const response = await fetch(`${API_URL}/decks`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            userId,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('profile')!).token}`,
        },
    });
    return response.json();
}