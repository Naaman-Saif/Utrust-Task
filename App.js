import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import Navigator from './src/navigations';
import Store from './src/Store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <View style={{ flex: 1 }}>
          <Navigator />
        </View>
      </Provider>
    );
  }
}