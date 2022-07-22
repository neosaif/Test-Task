/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import MainNavigation from './src/navigation/navigation'
// import { Provider } from 'react-redux';
// import { store } from './src/state';

const App = () => {
  return (
      // <Provider store={store}>
        <MainNavigation/>
      // </Provider>
  );
};

export default App;
