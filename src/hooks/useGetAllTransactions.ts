import { getAllTransactions } from "@/api/transactions";
import { TransactionItemType } from "@/types/transactionTypes";
import { useEffect, useState } from "react";

export const useGetAllTransactions = () => {
    const [transactions, setTransaction] = useState<TransactionItemType[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllTransactions();
                setTransaction(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { transactions, loading };
};