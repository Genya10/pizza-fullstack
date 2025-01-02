'use client'

import React from 'react'
import { Dialog} from '@/components/ui'
import { DialogContent } from '@/components/ui/dialog'
import { Title } from '../title'
import { Product } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm } from '../choose-pizza-form'

interface Props {
    product: Product
    className?: string
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter()

    return (
     <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent 
          className={cn(
            'p-0 w-[1060px] max-w-[1050px] min-h-[500px] bg-white overflow-hidden', className)}>
         {/*<ChoosePizzaForm />*/}
        </DialogContent>
     </Dialog>
    )
}