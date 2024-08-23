import { tesloApi } from "../../config/api/tesloApi"
import { TesloProduct } from "../../infrastructure/interfaces/teslo-products.reponse"
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";



export const getProductById = async(id:string) => {
    try {
        const {data} = await tesloApi.get<TesloProduct>(`/products/${id}`);

        return ProductMapper.tesloProductToEntity(data);

    } catch (error) {
        throw new Error(`Error getting product by id: ${id}`);

    }
}
