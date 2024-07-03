import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import ProductListingScreen from './app/components/ProductListingScreen';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <ProductListingScreen />
      </View>
    </SafeAreaView>
  );
};

export default App;
