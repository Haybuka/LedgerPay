import BalanceCard from "@/components/home/BalanceCard";
import CtaSection from "@/components/home/CtaSection";
import Greetings from "@/components/home/Greetings";
import RecentTransaction from "@/components/home/RecentTransaction";
import Screen from "@/components/Screen";
import { UserProfileType } from "@/types/userType";
import { userProfile } from "@/utils/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Home() {
  const safeInsets = useSafeAreaInsets();
  const [user, setUser] = React.useState<UserProfileType>(userProfile);
  return (

    <Screen>

      <Greetings firstName={user.firstName} lastName={user.lastName} />
      <View style={styles.banner}>
        <BalanceCard account={user.accountNumber} balance={user.balance} />
        <CtaSection />
      </View>
      <RecentTransaction />

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
