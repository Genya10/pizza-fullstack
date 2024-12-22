import { useSearchParams, useRouter } from "next/navigation"
import { useSet } from "react-use"
import React from "react"

interface PriceProps {
    priceFrom?: number
    priceTo?: number
  }
  
  interface QueryFilters extends PriceProps {
    pizzaTypes: string,
    sizes: string,
    ingredients: string
  }

export const useFilters = () => {
    // Получаем параметры из строки запроса (URL).
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>
    const router = useRouter()
    // Фильтр ингридиентов
    const [selectedIngredients, {toggle}] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')))

   // Инициализация состояний с помощью хука useSet, который работает с множествами (Set)
   // Если в URL уже есть параметры 'sizes', то мы их разбиваем по запятой и используем в качестве начального состояния
   //Фильтр размера
   const [sizes, {toggle: toggleSizes}] =
     useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []))
   //Фильтр типа пиццы
     const [pizzaTypes, {toggle: togglePizzaTypes}] = 
     useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []))
     //Фильтр стоимости
     const [prices, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,//Если параметр существует в URL,используем его,иначе undefined.
        priceTo: Number(searchParams.get('priceTo')) || undefined
       })

       return {
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setIngredients: toggle
       }
    }