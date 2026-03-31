import BalanceCard from "@/components/Home/BalanceCard";
import CtaSection from "@/components/Home/CtaSection";
import Greetings from "@/components/Home/Greetings";
import RecentTransaction from "@/components/Home/RecentTransaction";
import Screen from "@/components/Screen";
import { UserProfileType } from "@/types/userType";
import { userProfile } from "@/utils/constants";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";


export default function Home() {
  
  const [user, setUser] = useState<UserProfileType>(userProfile);


  // const { isConnected, isOnline, isReachable,networkConnectionType } = useContext(NetworkContext)

  // if (!isOnline || !isReachable) {
  //   Alert.alert(
  //     `${networkConnectionType} Network Status`,
  //     isOnline ? 'You are online' : 'No internet connection',
  //     [{ text: 'OK' }],
  //     { cancelable: true }
  //   );
  // }

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
