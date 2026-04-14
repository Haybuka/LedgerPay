
export const getAllTransactions = async () => {
    try {
        const response = await fetch(`http://172.20.10.3:3000/transactions`);
        console.log({ response }, 'here')
        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


