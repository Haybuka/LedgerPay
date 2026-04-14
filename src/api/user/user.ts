import { BASE_URL } from "..";

export const getUser = async () => {
    try {
        const response = await fetch(`${BASE_URL}/userProfile`);
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};



export const createUser = async (data: {
    email: string;
    password: string;
}) => {
    try {
        const response = await fetch(`${BASE_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};