import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useQuery } from '@tanstack/react-query';

import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { MainLayout } from '../../layouts/MainLayout';


export const HomeScreen = () => {


  const { isLoading, data:products=[], } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000*60*60, //1hour
    queryFn: ()=> getProductsByPage(0),
  });




  return (
    <MainLayout
     title="TesloShop - Products"
     subTitle="Aplicacion administrativa"
    >
      <Text>Hola mundo</Text>
    </MainLayout>
  );
}


const styles = StyleSheet.create({
  layout: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});
