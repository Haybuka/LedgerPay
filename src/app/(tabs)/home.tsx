import BalanceCard from "@/components/Home/BalanceCard";
import CtaSection from "@/components/Home/CtaSection";
import Greetings from "@/components/Home/Greetings";
import RecentTransaction from "@/components/Home/RecentTransaction";
import { useBiometricAuth } from "@/hooks/useBiometric";
import { AppContext } from "@/providers/AppContext";
import Screen from "@/templates/Screen";
import { UserProfileType } from "@/types/userType";
import { userProfile } from "@/utils/constants";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function Home() {

  const [user, setUser] = useState<UserProfileType>(userProfile);


  const { biometricEnabled } = useContext(AppContext)

  
  const { isAuthenticated, isLoading, error } = useBiometricAuth(biometricEnabled);

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
