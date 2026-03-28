import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Home = () => {

    const navigation = useNavigation<any>();
    
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={() => navigation.navigate('ledger')}><Text>Click Me</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('./(tabs)/home.tsx')}><Text>Click Home</Text></Pressable>
    </View>
  )
}

export default Home