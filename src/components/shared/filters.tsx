'use client'

import React from "react"
import { Title, FilterCheckbox, RangeSlider, CheckboxFilterGroup } from "@/components/shared"
import { Input } from "../ui"
import { useFilterIngredients } from "@/hooks/useFilterIngredients"
import { useSet } from "react-use"
import qs from 'qs'

interface Props {
    className?: string
}

interface PriceProps {
  priceFrom: number
  priceTo: number
}

export const Filters: React.FC<Props> = ({className}) => {
   const {ingredients, loading, onAddId, selectedIds: selectedIngredients} = useFilterIngredients()

   const [sizes, {toggle: toggleSizes}] = useSet(new Set<string>([]))
   const [pizzaTypes, {toggle: togglePizzaTypes}] = useSet(new Set<string>([]))

   const [prices, setPrice] = React.useState<PriceProps>({priceFrom:0, priceTo: 500})

   const items = ingredients.map((item) => ({value: String(item.id), text:item.name}))

   const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value
    })
   }

 

   React.useEffect(() => {
    const filters = {
      ...prices,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients)
     }
   },[prices, pizzaTypes, sizes, selectedIngredients])

    return (
        <div className={className}>
         <Title text="Filtration" size="sm" className="mb-5 font-bold"/>
         {/* Top checkboxes */}
         <CheckboxFilterGroup 
          title="Type of text"
           name="pizzaTypes"
           className="mb-5"           
           onClickCheckbox={togglePizzaTypes}
           selected={pizzaTypes}
           items={[
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
          <Input
            type='number' placeholder="0" min={0} max={300} 
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}/>
          <Input 
            type='number' placeholder="500" min={50} max={500} 
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}/>
          </div>

         <RangeSlider min={0} max={500} step={5} value={[
          prices.priceFrom,
          prices.priceTo
         ]}
         onValueChange={([priceFrom, priceTo])=> setPrice({priceFrom, priceTo})}
          />
         </div>
         <CheckboxFilterGroup 
           title="Ingridients"
           name='ingredients'
           className="mt-5"
           limit={6}
           defaultItems={items.slice(0,6)}
           items={items}
           loading={loading}
           onClickCheckbox={onAddId}
           selected ={selectedIngredients}
         />
        </div>
    )
}
