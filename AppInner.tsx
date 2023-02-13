import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Shell from './src/pages/Shell';
import Inner from './src/pages/Inner';

export type RootStackParamList = {
  Shell: undefined;
  Inner: {title: string; content: string};
};

const Stack = createNativeStackNavigator();

function AppInner() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Shell"
          component={Shell}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Inner"
          component={Inner}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppInner;
