import React from 'react'
import { StyleSheet, View} from 'react-native'
import WebView from 'react-native-webview'

const VIDEO_URL = process.env.EXPORT_PUBLIC_SERVER_URL + `/084da04b-ba9a-47d8-96f1-d61ce45c9028.html`;

const Player = () => {
    // const video = React.useRef(null);
    // url='https://together-cleanly-jaybird.ngrok-free.app/084da04b-ba9a-47d8-96f1-d61ce45c9028.html'

    return (
    <View>
        <WebView
          originWhitelist={['*']}
          source={{ html: `<html>
            <body>
                <iframe 
                    width="100%" 
                    height="450" 
                    frameborder="0" 
                    style="border:0"
                    src=${VIDEO_URL} allowfullscreen>
                </iframe>
            </body>
            </html>` 
        }}
          style={styles.video}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
})
export default React.memo(Player);