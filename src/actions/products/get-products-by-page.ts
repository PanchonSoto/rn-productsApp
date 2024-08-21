import { tesloApi } from "../../config/api/tesloApi"
import type { Product } from "../../domain/entities/entities/product";
import type { TesloProduct } from "../../infrastructure/interfaces/teslo-products.reponse";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";



export const getProductsByPage = async(page:number, limit:number=20):Promise<Product[]> => {

    try {
        const {data} = await tesloApi.get<TesloProduct[]>(`/products?offset=${page*10}&limit=${limit}`);

        const products = data.map(tesloProduct=>ProductMapper.tesloProductToEntity(tesloProduct));

        return products;
    } catch (error) {
        console.log({error});
        throw new Error("Error getting products");

    }

}
