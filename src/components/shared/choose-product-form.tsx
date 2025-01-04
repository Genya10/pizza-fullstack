import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { cn } from '@/lib/utils'

interface Props {
    imageUrl: string
    name: string   
    ingredients: any[]
    items?: any[]
    onClickAdd?: VoidFunction
    className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
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
        <div className={cn(className,'flex flex-1')}>
        {/*<ProductImage imageUrl={imageUrl} size={30}/>*/}
        <div className='flex items-center justify-center flex-1 relative w-full'>
         <img 
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
         />
        </div>
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