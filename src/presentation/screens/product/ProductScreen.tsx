import { useRef } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";

import { MainLayout } from "../../layouts/MainLayout";
import { RootStackParams } from "../../router/StackNavigator";
import { getProductById } from "../../../actions/products/get-products-by-id";
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
    <Formik initialValues={product} onSubmit={values=>console.log(values)}>
      {({handleChange, handleSubmit, values, errors, setFieldValue})=>(
        <MainLayout
          title={values?.title}
          subTitle={`Precio: ${values.price}`}
        >
          <ScrollView style={{ flex: 1 }}>
            {/* images */}
            <Layout>
              <FlatList
                data={values.images}
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
                value={values.title}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                value={values.slug}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange('slug')}
              />

              <Input
                label="Descripcion"
                value={values.description}
                style={{ marginVertical: 5 }}
                onChangeText={handleChange('description')}
                multiline
                numberOfLines={5}
              />
            </Layout>
            {/* price & stock */}
            <Layout style={{ marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
              <Input
                label="Precio"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={{ flex: 1 }}
              />
              <Input
                label="Inventario"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
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
                    onPress={()=> setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                      ? values.sizes.filter(s=>s!==size)
                      : [...values.sizes,size]
                      )
                    }
                    key={size}
                    style={{ flex: 1, backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined }}
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
            <Text>{JSON.stringify(values,null,2)}</Text>
            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
}
