import React from "react"
import { Filters } from "./useFilters"
import qs from 'qs'
import { useRouter } from "next/navigation"

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter()

    React.useEffect(() => {
        const params = {
          ...filters.prices,
          pizzaTypes: Array.from(filters.pizzaTypes),// Преобразуем множество pizzaTypes в массив.
          sizes: Array.from(filters.sizes),
          ingredients: Array.from(filters.selectedIngredients)
         }
         //Формируем строку запроса с фильтрами
         const query = qs.stringify(params, {
          arrayFormat:'comma'  // Параметры массива будут разделяться запятыми в строке запроса.
         })
         // Обновляем URL с новыми параметрами, не перезагружая страницу (scroll: false).
         router.push(`?${query}`,{
          scroll: false,
         })
       },[filters, router])
}