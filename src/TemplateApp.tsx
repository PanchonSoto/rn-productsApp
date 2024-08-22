import '../gesture-handler';

import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';


import { StackNavigator } from './presentation/router/StackNavigator';
import { AuthProvider } from './presentation/providers/AuthProvider';



const queryClient = new QueryClient();



export const TemplateApp = () => {

  const colorScheme = useColorScheme();
  const theme = colorScheme ==='dark' ? eva.dark : eva.light;
  const backgroundColor = colorScheme === 'dark'
    ? theme['color-basic-800']
    : theme['color-basic-100'];

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme={{
          dark:colorScheme==='dark',
          colors: {
            primary: theme['color-primary-500'],
            background: backgroundColor,
            card: theme['color-basic-100'],
            text: theme['text-basic-color'],
            border: theme['color-basic-800'],
            notification: theme['color-primary-500']
          }
        }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}

