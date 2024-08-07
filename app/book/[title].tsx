import React from 'react';
import {  StyleSheet, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';

const Page = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View>
            <Pdf
              source={{uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}}
              trustAllCerts={false}
              onPageChanged={(page: number) => { console.log(`Current Page is ${page}`)}}
              onError={(error: any) => { console.log({error})}}
            />
          </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40
  },
})
export default Page