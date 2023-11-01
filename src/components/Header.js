import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#d5dae0',
    borderBottomWidth: 3,
  },
  icon: {width: 109.375 / 2, height: 80 / 2, marginBottom: 10},
  welcome: {
    fontSize: 20,
    color: '#444',
    textAlign: 'center',
  },
});

function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={{uri:'https://play-lh.googleusercontent.com/9wQ_h-aydXfaMLmuJYnylgp57EQTkUPCSXnpYDSrb4tXaeUwaU0jx6oZcVBn4HlMRec'}}
        style={styles.icon}
      />
      <Text style={styles.welcome}>Doc Scan for React Native 2.0.0</Text>
    </View>
  );
}

export default Header;