import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';


type Props = {
  title?: string;
  showIconLeft?: boolean;
  onBack?: () => void;
  right?: React.ReactNode;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

export const HEADER_HEIGHT = 60;

export default function Header({
  title,
  showIconLeft = true,
  onBack,
  right,
  titleStyle,
  containerStyle,
}: Props) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) return onBack();
    if (navigation.canGoBack()) return navigation.goBack();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {showIconLeft && (
        <View style={styles.left}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Ionicons
              name='arrow-back'
              size={25}
            />
          </TouchableOpacity>
        </View>
      )}

      {title && (
        <Text style={[styles.title, titleStyle]}>
          {title}
        </Text>
      )}

      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  left: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});