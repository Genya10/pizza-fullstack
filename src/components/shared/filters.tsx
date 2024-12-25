'use client'

import React from "react"
import { Title,RangeSlider, CheckboxFilterGroup } from "@/components/shared"
import { Input } from "../ui"
import { useQueryFilters, useFilters, useIngredients } from "@/hooks/index"

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
   const {ingredients, loading} = useIngredients()
   const filters = useFilters()

  useQueryFilters(filters)
   // Преобразуем список ингредиентов в формат, который удобен для отображения.
   const items = ingredients.map((item) => ({value: String(item.id), text:item.name}))
  
   const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
   }

    return (
        <div className={className}>
         <Title text="Filtration" size="sm" className="mb-5 font-bold"/>
         {/* Top checkboxes */}
         <CheckboxFilterGroup 
          title="Type of text"
           name="pizzaTypes"
           className="mb-5"           
           onClickCheckbox={filters.setPizzaTypes} // Функция для изменения состояния типа пиццы.
           selected={filters.pizzaTypes}  // Выбранные типы пиццы.
           items={[ // Возможные типы пиццы.
            {text:'Thin', value:'1'},
            {text:'Traditional', value:'2'}
           ]}
           />
         <CheckboxFilterGroup 
          title="Sizes"
          name="sizes"
          className="mb-5"
          onClickCheckbox={filters.setSizes}
          selected={filters.sizes}
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
            value={String(filters.prices.priceFrom)}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}/>
          <Input 
            type='number' placeholder="500" min={50} max={500} 
            value={String(filters.prices.priceTo)}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}/>
          </div>
          {/* Слайдер для выбора диапазона цен */}
         <RangeSlider min={0} max={500} step={5} value={[
          filters.prices.priceFrom || 0,
          filters.prices.priceTo || 500
         ]}
         onValueChange={updatePrices}
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
           onClickCheckbox={filters.setSelectedIngredients} 
           selected ={filters.selectedIngredients}
         />
        </div>
    )
}
