import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { cn } from '@/lib/utils'
import { PizzaImage } from './pizza-image'
import { GroupVariants } from './group-variants'
import { pizzaSizes, pizzaTypes ,PizzaSize, PizzaType } from '@/constants/pizza'
import { Ingredient } from '@prisma/client'
import { IngredientItem } from './ingredient-item'

interface Props {
    imageUrl: string
    name: string   
    ingredients: Ingredient[]
    items?: any[]
    onClickAdd?: VoidFunction
    className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
     name,
     items,
     imageUrl,
     ingredients,
     onClickAdd,
     className
       }) => {
        const [size, setSize] = React.useState<PizzaSize>(20)
        const [type, setType] = React.useState<PizzaType>(1)

        const textDetails = '30 sm, traditional testo'
        const totalPrice = 180
        
    return (
        <div className={cn(className,'flex flex-1')}>
       
        <PizzaImage imageUrl={imageUrl} size={size}/>

          <div className='w-[490] bg-[#FCFCFC] p-7'>
           <Title text={name} size="md" className='font-extrabold mb-1'/>
           
           <p className='text-gray-400'>{textDetails}</p>

          <div className='flex flex-col gap-4 mt-5'>
           <GroupVariants 
              items={pizzaSizes} 
              value={String(size)} 
              onClick={value => setSize(Number(value) as PizzaSize)}
            />

            <GroupVariants 
              items={pizzaTypes}
              value={String(type)}
              onClick={(value) => setType(Number(value) as PizzaType)}
            />
          </div>
          
          <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
           <div className='grid grid-cols-3 gap-3'>
           {ingredients.map((ingredient) => (
            <IngredientItem 
              key={ingredient.id}
              name={ingredient.name}
              price={ingredient.price}
              imageUrl={ingredient.imageUrl}
              onClick={onClickAdd}
            />
           ))}
           </div>
          </div>
        
           <Button
             className='h-[55] px-10 text-base rounded-[18px] w-full'>
              Add to basket {totalPrice}
           </Button>
          </div>
        </div>
    )
}