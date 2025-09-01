import { http, HttpResponse } from 'msw'
import type { GetPopularProductsResponse } from '../get-popular-items'


export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { products: 'Pizza 01', amout: 5 },
    { products: 'Pizza 02', amout: 3 },
    { products: 'Pizza 03', amout: 2 },
    { products: 'Pizza 04', amout: 7 },
    { products: 'Pizza 05', amout: 4 },
  ])
})