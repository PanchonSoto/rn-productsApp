import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import { MyIcon } from '../../components/ui/MyIcon';
import { RootStackParams } from '../../router/StackNavigator';






interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}:Props) => {

  const { height } = useWindowDimensions();




  return (
    <Layout style={{flex:1}}>
      <ScrollView style={{marginHorizontal:40}}>

        <Layout style={{paddingTop:height*0.30}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{marginTop:20}}>

          <Input
           accessoryLeft={<MyIcon name="person-outline"/>}
           placeholder="Nombre"
           style={{marginBottom:10}}
          />

          <Input
           accessoryLeft={<MyIcon name="email-outline"/>}
           placeholder="Correo electronico"
           keyboardType="email-address"
           autoCapitalize="none"
           style={{marginBottom:10}}
          />

          <Input
           accessoryLeft={<MyIcon name="lock-outline"/>}
           placeholder="Contrasena"
           autoCapitalize="none"
           secureTextEntry
           style={{marginBottom:10}}
          />

          <Layout style={{height:20}}/>

          <Layout>
            <Button
             accessoryRight={<MyIcon name="arrow-forward-outline"/>}
             onPress={()=>{}}
            >
              Crear
            </Button>
          </Layout>

          <Layout style={{height:50}}/>

          <Layout style={{alignItems:'flex-end', flexDirection:'row', justifyContent:'center'}}>
            <Text>Ya tienes una cuenta?</Text>
            <Text
             status="primary" category="s1"
             onPress={()=>navigation.goBack()}
            >
              { ' ' }
              iniciar { ' ' }
              </Text>
          </Layout>
        </Layout>

      </ScrollView>

    </Layout>
  );
}
