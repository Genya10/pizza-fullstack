'use client'

import React from "react"
import { Title, FilterCheckbox, RangeSlider, CheckboxFilterGroup } from "@/components/shared"
import { Input } from "../ui"
import { useFilterIngredients } from "@/hooks/useFilterIngredients"
import { useSet } from "react-use" //Хук из библиотеки `react-use` для работы с множествами (Set).
import qs from 'qs' //Библиотека для работы с параметрами строки запроса.
import { useRouter, useSearchParams } from "next/navigation" //Хуки из Next.js для работы с маршрутизатором и параметрами строки запроса.

interface Props {
    className?: string
}

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string,
  sizes: string,
  ingredients: string
}

export const Filters: React.FC<Props> = ({className}) => {
  // Получаем параметры из строки запроса (URL).
   const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>
   const router = useRouter()
   const {ingredients, loading, onAddId, selectedIds: selectedIngredients} = useFilterIngredients()
  
   // Инициализация состояний с помощью хука useSet, который работает с множествами (Set)
   // Если в URL уже есть параметры 'sizes', то мы их разбиваем по запятой и используем в качестве начального состояния
   const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []))
   const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>([]))

   const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,//Если параметр существует в URL,используем его,иначе undefined.
    priceTo: Number(searchParams.get('priceTo')) || undefined
   })
   
   // Преобразуем список ингредиентов в формат, который удобен для отображения.
   const items = ingredients.map((item) => ({value: String(item.id), text:item.name}))
  
   // Функция для обновления ценового диапазона (priceFrom или priceTo).
   const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value
    })
   }

   console.log(searchParams, 999)

   React.useEffect(() => {
    const filters = {
      ...prices,
      pizzaTypes: Array.from(pizzaTypes),// Преобразуем множество pizzaTypes в массив.
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients)
     }
     //Формируем строку запроса с фильтрами
     const query = qs.stringify(filters, {
      arrayFormat:'comma'  // Параметры массива будут разделяться запятыми в строке запроса.
     })
     // Обновляем URL с новыми параметрами, не перезагружая страницу (scroll: false).
     router.push(`?${query}`,{
      scroll: false,
     })
   },[prices, pizzaTypes, sizes, selectedIngredients])

    return (
        <div className={className}>
         <Title text="Filtration" size="sm" className="mb-5 font-bold"/>
         {/* Top checkboxes */}
         <CheckboxFilterGroup 
          title="Type of text"
           name="pizzaTypes"
           className="mb-5"           
           onClickCheckbox={togglePizzaTypes} // Функция для изменения состояния типа пиццы.
           selected={pizzaTypes}  // Выбранные типы пиццы.
           items={[ // Возможные типы пиццы.
            {text:'Thin', value:'1'},
            {text:'Traditional', value:'2'}
           ]}
           />
         <CheckboxFilterGroup 
          title="Sizes"
          name="sizes"
          className="mb-5"
          onClickCheckbox={toggleSizes}
          selected={sizes}
          items={[
            {text:'20sm', value:'20'},
            {text:'30sm', value:'30'},
            {text:'40sm', value:'40'},
          ]}
         />
           {/* Price filter */}
          <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
         <p className="font-bold mb-3">Price from to:</p>
          <div className="flex gap-3 mb-5">
          {/* Поля для ввода минимальной и максимальной цены */}
          <Input
            type='number' placeholder="0" min={0} max={300} 
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}/>
          <Input 
            type='number' placeholder="500" min={50} max={500} 
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}/>
          </div>
          {/* Слайдер для выбора диапазона цен */}
         <RangeSlider min={0} max={500} step={5} value={[
          prices.priceFrom || 0,
          prices.priceTo || 500
         ]}
         onValueChange={([priceFrom, priceTo])=> setPrice({priceFrom, priceTo})}
          />
         </div>
         {/* Группа чекбоксов для выбора ингредиентов */}
         <CheckboxFilterGroup 
           title="Ingridients"
           name='ingredients'
           className="mt-5"
           limit={6}
           defaultItems={items.slice(0,6)}
           items={items}
           loading={loading}
           onClickCheckbox={onAddId} //Функция для добавления/удаления ингредиента при клике.
           selected ={selectedIngredients}
         />
        </div>
    )
}
