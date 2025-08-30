import { api } from "@/lib/axios";

export type GetPopularProductsResponse = {
    products: string;
    amout: number;
}[]

export async function getPopularProducts(){
    const response = await api.get<GetPopularProductsResponse>('/metrics/popular-products');

    return response.data;
}