import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useAuthStore } from '../../../store/auth/useAuthStore';


export const HomeScreen = () => {

  const { logout } = useAuthStore();

  return (
    <Layout style={styles.layout}>
      <Text>HomeScreen</Text>

      <Button
       onPress={logout}
       accessoryLeft={<Icon name="log-out-outline"/>}
      >
        Cerrar Sesion
      </Button>
    </Layout>
  );
}


const styles = StyleSheet.create({
  layout: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});
