
export const getUser = async () => {
    try {
        const response = await fetch('http://172.20.10.3:3000/userProfile');
        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


