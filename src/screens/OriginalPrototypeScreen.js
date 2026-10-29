import { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import originalHtml from '../webview/originalHtml';

export default function OriginalPrototypeScreen() {
  const webView = useRef(null);
  const [page, setPage] = useState('home');

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      webView.current?.injectJavaScript(
        "if(window.__gbHandleBack&&window.__gbHandleBack()){window.ReactNativeWebView.postMessage('back-consumed')}else{window.ReactNativeWebView.postMessage('back-exit')}true;",
      );
      return true;
    });
    return () => subscription.remove();
  }, []);

  const handleMessage = (event) => {
    const message = event.nativeEvent.data;
    if (message === 'back-exit') BackHandler.exitApp();
    else if (message === 'home' || message === 'page' || message === 'profile') setPage(message);
  };

  const statusBackground = page === 'home' ? '#e01e26' : page === 'profile' ? '#fdf1ef' : '#fcf6fa';

  return (
    <View style={styles.screen}>
      <StatusBar style={page === 'home' ? 'light' : 'dark'} backgroundColor={statusBackground} />
      <WebView
        ref={webView}
        source={{ html: originalHtml, baseUrl: 'https://globalbadariya.local/' }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        onMessage={handleMessage}
        overScrollMode="never"
        bounces={false}
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fcf6fa' },
  webView: { flex: 1, backgroundColor: '#fcf6fa' },
});
