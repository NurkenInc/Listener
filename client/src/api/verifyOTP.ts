import { API_URL } from "./config";

export async function verifyOTP(userId: string, otp: string) { 
    const response = await fetch(`${API_URL}/verifyOTP`, {
        method: 'POST',
        body: JSON.stringify({
            userId,
            otp,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}