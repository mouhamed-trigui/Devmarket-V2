import { StatusBar } from 'expo-status-bar';
// 1. import `NativeBaseProvider` component
import React from 'react';
import { NativeBaseProvider, Center } from 'native-base';
import Login from './src/app/screens/auth/login';
import { Provider } from 'react-redux';
import store from './src/app/stores/index';
import Notification from './src/app/utils/notifications';
export default function App() {
  return (
    <Provider store={store}>
      <Notification>
        <NativeBaseProvider>
          <StatusBar style="light" />
          <Center flex={1} px="1">
            <Login />
          </Center>
        </NativeBaseProvider>
      </Notification>
    </Provider>
  );
}
