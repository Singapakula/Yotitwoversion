// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
          
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Button from './src/components/Button';
import Header from './src/components/Header';
import Input from './src/components/Input';
import InputSpacer from './src/components/InputSpacer';
import RNYotiDocScan from '@getyoti/yoti-doc-scan-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 20,
    color: '#444',
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  intro: {
    color: '#475056',
    fontSize: 12,
    marginBottom: 15,
  },
  results: {flexGrow: 1, paddingHorizontal: 20},
  resultsContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  resultsHeader: {paddingTop: 5, width: 200},
  resultsHeaderText: {
    textAlign: 'center',
    color: 'white',
  },
  resultTitle: {
    color: '#444',
    fontSize: 16,
    marginBottom: 0,
  },
  resultDescription: {
    color: '#475056',
    fontSize: 8,
    marginTop: 15,
  },
  resultText: {
    color: '#444',
    fontSize: 12,
    marginBottom: 15,
  },
  resultRow: {flexDirection: 'row'},
  resultRowIcon: {fontSize: 12, marginTop: 5, marginRight: 5},
  resultsScrollViewContainer: {
    backgroundColor: 'white',
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  gutter: {paddingHorizontal: 20, paddingVertical: 20},
  yotiButton: {
    height: 60,
    alignSelf: 'center',
  },
  inputsTopGutter: {
    marginVertical: 20,
    width: '100%',
    borderBottomColor: '#d5dae0',
    borderBottomWidth: 2,
    borderTopColor: '#d5dae0',
    borderTopWidth: 2,
  },
});

export default () => {
  const [code, setCode] = useState(null);
  const [description, setDescription] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [clientSessionToken, setClientSessionToken] = useState('');
  const showYotiButton = sessionId.length > 0 && clientSessionToken.length > 0

  useEffect(() => {
    if (!showYotiButton) {
      setCode(null)
      setDescription(null)
    }
  }, [showYotiButton])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={{flex: 1, justifyContent: 'space-between', width: '100%'}}>
          <View style={styles.gutter}>
            <Text style={styles.intro}>
              Please fill in the required information below, and tap the button once you are done.
            </Text>
          </View>
          <View style={styles.results}>
            {code != null &&
              <Results code={code} description={description} />
            }
          </View>
          <View>
            <View style={styles.inputsTopGutter}>
              <Input
                placeholder="Session ID"
                value={sessionId}
                onChangeText={setSessionId}
              />
              <InputSpacer />
              <Input
                placeholder="Session token"
                value={clientSessionToken}
                onChangeText={setClientSessionToken}
              />
              <InputSpacer />
            </View>

            <View style={styles.yotiButton}>
              {showYotiButton && (
                <Button
                  onPress={() => {
                    const onSuccess = (code, description) => {
                      setCode(code)
                      setDescription(description)
                    }
                    const onError = (code, description) => {
                      setCode(code)
                      setDescription(description)
                    }
                    RNYotiDocScan.setRequestCode(9999); // Optional request code for Android
                    RNYotiDocScan.startSession(sessionId, clientSessionToken, onSuccess, onError);
                  }}
                  title="Start session"
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

function Results({code, description}) {
  const isSuccessOutcome = code == 0;
  return (
    <View style={styles.resultsContainer}>
      <View
        style={[
          styles.resultsHeader,
          {
            backgroundColor: !isSuccessOutcome ? '#fb7570' : '#37c58f',
          },
        ]}>
        <Text style={styles.resultsHeaderText}>
          {isSuccessOutcome ? 'Success' : 'Error'}
        </Text>
      </View>

      <View
        style={[
          styles.resultsScrollViewContainer,
          {
            borderColor: !isSuccessOutcome ? '#fb7570' : '#37c58f',
          },
        ]}>
        <ScrollView>
          <View style={styles.resultRow}>
            <View>
              <Text style={styles.resultTitle}>Code: {code}</Text>
              <Text style={styles.resultDescription}>
                Description:
              </Text>
              <Text style={styles.resultText}>
                {description != null ? description : 'No description was returned.'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}