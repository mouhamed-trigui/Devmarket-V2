import * as Expo from 'expo';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useFonts, loadAsync, FontDisplay  } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
export {
  Permissions,
  Constants,
  Notifications,
  useFonts,
  loadAsync, 
  FontDisplay,
  ScreenOrientation,
  LinearGradient,
  StatusBar,
  LocalAuthentication,
  AsyncStorage
}

export default Expo;