import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'

interface Props {
    imageUrl: string
    name: string   
    ingredients: any[]
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
        const textDetails = '30 sm, traditional testo'
        const totalPrice = 200
        
    return (
        <div className='flex'>
         <ProductImage imageUrl={imageUrl} size={30}/>
          <div className='w-[490] bg-[#FCFCFC] p-7'>
           <Title text={name} size="md" className='font-extrabold mb-1'/>
           <p className='text-gray-400'>{textDetails}</p>
           <Button
             className='h-[55] px-10 text-base rounded-[18px] w-full'>
              Add to basket {totalPrice}
           </Button>
          </div>
        </div>
    )
}