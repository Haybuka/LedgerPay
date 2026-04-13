
import { UserProfileType } from "@/api/user/types";
import { getUser } from "@/api/user/user";
import { useCallback, useEffect, useState } from "react";

export const useGetUser = () => {
  const [user, setUser] = useState<UserProfileType>({} as UserProfileType);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const result = await getUser();
      setUser(result);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // initial load
  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [fetchData]);

  // 👇 this is what you'll call for pull-to-refresh
  const refetch = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return { user, loading, refreshing, refetch };
};