'use client'

import { Title, FilterCheckbox, RangeSlider, CheckboxFilterGroup } from "@/components/shared";
import { Input } from "../ui";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
   const {ingredients, loading} = useFilterIngredients()

   const items = ingredients.map((item) => ({value: String(item.id), text:item.name}))

    return (
        <div className={className}>
         <Title text="Filtration" size="sm" className="mb-5 font-bold"/>
         {/* Top checkboxes */}
         <div className="flex flex-col gap-4">
          <FilterCheckbox text='Can be collected' value='1'/>
          <FilterCheckbox  text='New items' value='2'/>
         </div>
           {/* Price filter */}
          <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
         <p className="font-bold mb-3">Price from to:</p>
          <div className="flex gap-3 mb-5">
          <Input type='number' placeholder="0" min={0} max={300} defaultValue={0}/>
          <Input type='number' placeholder="300" min={50} max={300}/>
          </div>
         <RangeSlider min={0} max={2000} step={10} value={[0, 5000]}/>
         </div>
         <CheckboxFilterGroup 
           title="Ingridients"
           className="mt-5"
           limit={6}
           defaultItems={items.slice(0,6)}
           items={items}
           loading={loading}
           onClickCheckbox={(id) => console.log(id)}
         />
        </div>
    )
}