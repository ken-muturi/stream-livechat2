// import Books from '@/components/Books';
// import Player from '@/components/Player';
import React from 'react';
import {  StyleSheet, KeyboardAvoidingView, Platform, View} from 'react-native';
import WebView from 'react-native-webview';
// const VIDEO_URL = process.env.EXPORT_PUBLIC_SERVER_URL + `/084da04b-ba9a-47d8-96f1-d61ce45c9028.html`;
const VIDEO_URL = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';
const Page = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html: `<html>
            <body>
                <iframe 
                    width="100%" 
                    height="450" 
                    frameborder="0" 
                    style="border:0"
                    src="${VIDEO_URL}" allowfullscreen>
                </iframe>
            </body>
            </html>` 
        }}
          // style={styles.video}
        />
          {/* <Player /> */}
          {/* <Books /> */}
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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