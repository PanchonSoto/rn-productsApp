import '../gesture-handler';

import { useColorScheme } from 'react-native';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './presentation/router/StackNavigator';


export const TemplateApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme ==='dark' ? eva.dark : eva.light;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

