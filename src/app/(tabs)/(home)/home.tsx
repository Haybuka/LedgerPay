
import { TransactionItemType } from "@/api/transaction/types";
import Typography, { AppTextStyle } from "@/atoms/Typography";
import { BalanceCard, CtaSection, Greetings } from "@/components/Home";
import { TransactionItem } from "@/components/transaction";
import { useBiometricAuth } from "@/hooks/useBiometric";
import { useGetAllTransactions } from "@/hooks/useGetAllTransactions";
import { useGetUser } from "@/hooks/useGetUser";
import { AppContext } from "@/providers/AppContext";
import { Screen } from "@/templates";
import { COLORS } from "@/theme/colors";
import { useNavigation, useRouter } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";


export default function Home() {

  // const [user, setUser] = useState<UserProfileType>(userProfile);
  const { biometricEnabled } = useContext(AppContext)
  const router = useRouter();
  const handleNavigate = () => {
    router.push('/transaction');
  }

  const handleSelectedItem = (item: TransactionItemType) => {
    console.log(item, "selected item")
  }

  const { isAuthenticated, isLoading, error } = useBiometricAuth(biometricEnabled);
  const navigation = useNavigation();

  const { transactions, loading : loadingTransactions, refreshing : isRefreshingTransaction, refetch } = useGetAllTransactions();
  const { user, loading : loadingUser, refreshing:isRefreshingUser, refetch:refetchUser } = useGetUser();

  const isFetching = isRefreshingUser || isRefreshingTransaction;

  if (biometricEnabled && isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Authenticating...</Text>
      </View>
    );
  }

  if (biometricEnabled && !isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error || 'Authentication required'}</Text>
      </View>
    );
  }

console.log(user.account)
  return (

    <Screen>
      <FlatList
        data={transactions.slice(0, 5)}
        contentContainerStyle={{ marginBottom: 10 }}
        ListHeaderComponent={() => (
          <>
            <Greetings firstName={user?.firstName} lastName={user?.lastName} />
            <View style={styles.banner}>
              <BalanceCard account={user.account} />
              <CtaSection />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Typography color={COLORS.ledgerBlue} style={{ marginBottom: 10 }} textstyle={AppTextStyle.bodyMedium}>Recent Transactions</Typography>
              <Pressable onPress={handleNavigate}>
                <Typography color={COLORS.ledgerBlue} style={{ marginBottom: 10, textDecorationLine: 'underline' }} textstyle={AppTextStyle.bodyMedium}>See more</Typography>
              </Pressable>
            </View>
          </>
        )}
        initialNumToRender={3}
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransactionItem item={item} handleSelected={handleSelectedItem} />}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: 'center', }}>
            <Typography style={{ marginTop: 10, fontSize: 16, color: '#999' }}>
              No transactions found
            </Typography>
          </View>
        )}
      />

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  banner: {

    marginVertical: 20,

  },

});
