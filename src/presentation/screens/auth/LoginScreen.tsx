import { Alert, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import { MyIcon } from '../../components/MyIcon';
import { RootStackParams } from '../../router/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../../store/auth/useAuthStore';






interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}:Props) => {

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { height } = useWindowDimensions();


  const onLogin = async() => {
    if(form.email.length===0 || form.password.length===0) {
      return;
    }
    setIsPosting(true);
    const wasSucessful = await login(form.email, form.password);
    setIsPosting(false);
    if(wasSucessful) return;

    Alert.alert('Error', 'Usuario o contrasena incorrecta');
  }



  return (
    <Layout style={{flex:1}}>
      <ScrollView style={{marginHorizontal:40}}>

        <Layout style={{paddingTop:height*0.30}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={{marginTop:20}}>
          <Input
           accessoryLeft={<MyIcon name="email-outline"/>}
           placeholder="Correo electronico"
           keyboardType="email-address"
           autoCapitalize="none"
           value={form.email}
           onChangeText={(email)=>setForm({...form,email})}
           style={{marginBottom:10}}
          />

          <Input
           accessoryLeft={<MyIcon name="lock-outline"/>}
           placeholder="Contrasena"
           autoCapitalize="none"
           secureTextEntry
           value={form.password}
           onChangeText={(password)=>setForm({...form,password})}
           style={{marginBottom:10}}
          />

          <Layout style={{height:20}}/>

          <Layout>
            <Button
             disabled={isPosting}
             accessoryRight={<MyIcon name="arrow-forward-outline"/>}
             onPress={onLogin}
            >
              Ingresar
            </Button>
          </Layout>

          <Layout style={{height:50}}/>

          <Layout style={{alignItems:'flex-end', flexDirection:'row', justifyContent:'center'}}>
            <Text>No tienes cuenta?</Text>
            <Text
             status="primary" category="s1"
             onPress={()=>navigation.navigate('RegisterScreen')}
            >
              { ' ' }
              crea una { ' ' }
              </Text>
          </Layout>
        </Layout>

      </ScrollView>

    </Layout>
  );
}
