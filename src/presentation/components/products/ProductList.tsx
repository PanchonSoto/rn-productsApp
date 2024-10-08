import { useState } from "react";
import { Layout, List, Text } from "@ui-kitten/components";

import { Product } from "../../../domain/entities/entities/product";
import { ProductCard } from "./ProductCard";
import { RefreshControl } from "react-native-gesture-handler";




interface Props {
  products: Product[];

  fetchNextPage: ()=>void;
}

export const ProductList = ({products, fetchNextPage}:Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async() => {
    setIsRefreshing(true);

    await new Promise(resolve=>setTimeout(resolve,1500));
    setIsRefreshing(false);
  }




  return (
    <List
     data={products}
     numColumns={2}
     keyExtractor={(item,index)=>`${item.id}-${index}`}
     renderItem={({item})=>(
        <ProductCard product={item}/>
     )}

     ListFooterComponent={()=><Layout style={{height:150}}/>}
     onEndReached={ fetchNextPage }
     onEndReachedThreshold={0.4}

     refreshControl={
      <RefreshControl
       refreshing={isRefreshing}
       onRefresh={onPullToRefresh}
      />
     }
    />
  )
}
