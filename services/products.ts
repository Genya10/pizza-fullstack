import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

export const search = async(query: string): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params:{ query}})
  console.log('API Response', response.data)
  return response.data
}

// return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params:{ query}})).data 