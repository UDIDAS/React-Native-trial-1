import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

const App = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const htmlFiles = {
    1: require('./Plots/docLenDist.html'),
    2: require('./Plots/AreaChart1.html'),
    3: require('./Plots/AreaChart2.html'),
  };

  const loadHTML = async (htmlFile) => {
    try {
      const asset = Asset.fromModule(htmlFile);
      await asset.downloadAsync();
      const htmlUri = asset.localUri;
      const response = await fetch(htmlUri);
      const htmlContent = await response.text();
      setHtmlContent(htmlContent);
    } catch (error) {
      // Handle the error if desired
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      loadHTML(htmlFiles[isLoading]);
    }
  }, [isLoading]);

  const handleLoadButtonPress = (index) => {
    setIsLoading(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button 
            title="Load HTML 1"
            onPress={() => handleLoadButtonPress(1)}
            disabled={isLoading === 1}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Load HTML 2"
            onPress={() => handleLoadButtonPress(2)}
            disabled={isLoading === 2}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Load HTML 3"
            onPress={() => handleLoadButtonPress(3)}
            disabled={isLoading === 3}
          />
        </View>
        {/* <View style={styles.button}>
          <Button
            title="Load HTML 4"
            onPress={() => handleLoadButtonPress(4)}
            disabled={isLoading === 4}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Load HTML 5"
            onPress={() => handleLoadButtonPress(5)}
            disabled={isLoading === 5}
          />
        </View>   */}
      </View>
      {htmlContent && (
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          originWhitelist={['*']}
          scalesPageToFit={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  button:{
    margin: 5,
  },
  webview: {
    flex: 1, 
  },
});

export default App;