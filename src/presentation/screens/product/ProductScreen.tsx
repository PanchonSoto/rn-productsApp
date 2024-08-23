import { RouteProp, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { useQuery } from "@tanstack/react-query";

import { MainLayout } from "../../layouts/MainLayout";
import { RootStackParams } from "../../router/StackNavigator";
import { getProductById } from "../../../actions/products/get-products-by-id";
import { useRef } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FadeInImage } from "../../components/ui/FadeInImage";
import { Size } from "../../../domain/entities/entities/product";
import Badge from "../../components/ui/Badge";
import { MyIcon } from "../../components/ui/MyIcon";



const sizes: Size[] = [Size.S, Size.M, Size.L, Size.Xs, Size.Xl, Size.Xxl];


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { };



export const ProductScreen = ({ route }: Props) => {

  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  // const { params } = useRoute<RouteProp<RootStackParams>>();
  // const porductId = params?.productId;

  const { isLoading, data: product, } = useQuery({
    queryKey: ['products', productIdRef.current],
    staleTime: 1000 * 60 * 60, //1hour
    queryFn: () => getProductById(productIdRef.current),
  });

  if (!product) {
    return (<MainLayout title="Cargando..." />)
  }




  return (
    <MainLayout
      title={product?.title}
      subTitle={`Precio: ${product.price}`}
    >
      <ScrollView style={{ flex: 1 }}>
        {/* images */}
        <Layout>
          <FlatList
            data={product.images}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage
                uri={item}
                style={{ width: 300, height: 300, marginHorizontal: 7 }}
              />
            )}
          />
        </Layout>
        {/* title & slug  */}
        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label="Titulo"
            value={product.title}
            style={{ marginVertical: 5 }}
          />
          <Input
            label="Slug"
            value={product.slug}
            style={{ marginVertical: 5 }}
          />

          <Input
            label="Descripcion"
            value={product.description}
            style={{ marginVertical: 5 }}
            multiline
            numberOfLines={5}
          />
        </Layout>
        {/* price & stock */}
        <Layout style={{ marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
          <Input
            label="Precio"
            value={product.price.toString()}
            style={{ flex: 1 }}
          />
          <Input
            label="Inventario"
            value={product.stock.toString()}
            style={{ flex: 1 }}
          />
        </Layout>

        {/* Selectors */}
        <Badge
          value={product.gender}
        />
        <ButtonGroup
          style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
          size="small"
          appearance="outline"
        >
          {
            sizes.map((size) => (
              <Button
                key={size}
                style={{ flex: 1, backgroundColor: true ? theme['color-primary-200'] : undefined }}
              >{size}</Button>
            ))
          }
        </ButtonGroup>

        <Button
          accessoryLeft={<MyIcon name="save-outline" white />}
          onPress={() => console.log('Guardar')}
          style={{ margin: 15 }}
        >
          Guardar
        </Button>
        <Text>{JSON.stringify(product,null,2)}</Text>
        <Layout style={{ height: 200 }} />
      </ScrollView>
    </MainLayout>
  );
}
