import { Image, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Card, Text } from "@ui-kitten/components";
import { FadeInImage } from "../ui/FadeInImage";
import { RootStackParams } from '../../router/StackNavigator';
import { Product } from "../../../domain/entities/entities/product"



interface Props {
    product: Product;
}



export const ProductCard = ({product}:Props) => {
    // console.log({product})

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Card
     style={styles.Kcard}
     onPress={()=>navigation.navigate('ProductScreen',{productId:product.id})}
    >
        {
            (product.images.length===0)
            ? (<Image style={styles.img} source={require('../../../assets/no-product-image.png')}/>)
            : (<FadeInImage style={styles.fadeImg} uri={product.images[0]}/>)
        }
        {/* <Image style={styles.img} source={require('../../../assets/no-product-image.png')}/> */}
        <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
    Kcard: {
        flex:1,
        backgroundColor: '#F9F9F9',
        margin:3,
    },
    img: {
        width:'100%',
        height:200,
    },
    fadeImg:{
        flex:1,
        height:200,
        width:'100%',
    },
    title: {
        textAlign:'center'
    }
});
