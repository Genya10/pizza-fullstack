'use client'

import React from "react"
import { Title } from "./title"
import { cn } from "@/lib/utils"
import { ProductCard } from "./product-card"
import { useIntersection } from 'react-use'

interface Props {
    title: string
    items: any[]
    className?: string
    listClassName?: string
    categoryId: number
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    listClassName,
    categoryId,
    className,
    }) => {
        const intersectionRef = React.useRef(null)
        const intersection = useIntersection(intersectionRef, {
            threshold: 0.4
        })

        React.useEffect(() => {
            if(intersection?.isIntersecting){
                console.log(title, categoryId)
            }
        },[categoryId, intersection?.isIntersecting, title])

    return (
        <div className={className} id={title} ref={intersectionRef}>
         <Title text={title} size="lg" className="font-extrabold mb-5"/>

         <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
         {items.map((product, id) => (
            <ProductCard 
               key={product.id}
               id={product.id}
               name={product.name}
               imageUrl={product.imageUrl}
               price={product.items[0].price}
            />
         ))}
         </div>
        </div>
    )
}