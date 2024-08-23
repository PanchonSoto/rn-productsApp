import { StyleSheet } from 'react-native';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getProductsByPage } from '../../../actions/products/get-products-by-page';

import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { MainLayout } from '../../layouts/MainLayout';
import { ProductList } from '../../components/products/ProductList';


export const HomeScreen = () => {


  // const { isLoading, data:products=[], } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000*60*60, //1hour
  //   queryFn: ()=> getProductsByPage(0),
  // });
  const { isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000*60*60, //1hour
    initialPageParam: 0,
    queryFn: async(params)=>{
      // console.log({params});
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam:(lastPage, allPages)=>allPages?.length,
  });


  // console.log({data});
  // const pages: Product[][] = [
  //   [product1, product2, product3],  // Page 1
  //   [product4, product5, product6],  // Page 2
  //   [product7, product8, product9],  // Page 3
  // ];


  return (
    <MainLayout
     title="TesloShop - Products"
     subTitle="Aplicacion administrativa"
    >
      {
        isLoading
        ? (<FullScreenLoader />)
        : <ProductList
         fetchNextPage={fetchNextPage}
         products={data?.pages.flat() ?? []}
        />
      }
    </MainLayout>
  );
}

