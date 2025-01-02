import React from 'react'

interface Props {
    imageUrl: string
    name: string   
    ingredients: any[]
    items?: any[]
    onClickAdd: VoidFunction
    className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
    name,items,imageUrl,ingredients,onClickAdd,className}) => {
        
    return (
        <div className={className}></div>
    )
}