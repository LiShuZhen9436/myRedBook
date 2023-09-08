/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {Welcome} from './src/modules/welcomePages/Welcomepage';
import {Login} from './src/modules/loginPages/Loginpage';
import {MainTab} from './src/modules/mainPages/MainTab';
import {ActicleDetail} from './src/modules/articleDetail/ActicleDetail';
import {SearchShop} from './src/modules/shop/SearchShop';

function App(): JSX.Element {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider style={{width: '100%', height: '100%'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            cardStyle: {elevation: 1},
          }}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}></Stack.Screen>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}></Stack.Screen>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}></Stack.Screen>
          <Stack.Screen
            name="ActicleDetail"
            component={ActicleDetail}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}></Stack.Screen>
          {/* presentation: 'transparentModal', 设置透明 */}
          <Stack.Screen
            name="SearchShop"
            component={SearchShop}
            options={{
              headerShown: false,
              presentation: 'transparentModal',
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
