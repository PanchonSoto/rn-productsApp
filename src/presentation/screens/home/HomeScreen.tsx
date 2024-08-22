import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useQuery } from '@tanstack/react-query';

import { getProductsByPage } from '../../../actions/products/get-products-by-page';


export const HomeScreen = () => {


  const { isLoading, data:products=[], } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000*60*60, //1hour
    queryFn: ()=> getProductsByPage(0),
  });




  return (
    <Layout style={styles.layout}>
      <Text>{JSON.stringify(products,null,2)}</Text>


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
