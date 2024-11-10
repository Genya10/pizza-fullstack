import { cn } from '@/lib/utils'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { Button } from '../ui'
import { UserRound, ShoppingCart , ArrowRight} from 'lucide-react'

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className={cn('border border-b', className)}>
        <Container className='flex items-center justify-around py-8'>
            {/* Left part */}
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='Logo' width={38} height={38}/>
            <div>
                <h1 className='text-2xl uppercase font-black'>The best pizza</h1>                
                <p className='text-lg text-gray-500 leading-3'>really tasty</p>
            </div>
          </div>
          {/* Right part */}
          <div className='flex items-center gap-3'>            
           <Button variant='outline' className='flex items-center gap-2'>
            <UserRound size={16}/>
              Enter
            </Button>
            <div>
                <Button className='group relative'>
                  <b>120 $</b>
                  <span className='h-full w-[2px] bg-white/30 mx-3'/>
                  <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
                   <ShoppingCart size={16} className='relative' strokeWidth={2}/>
                   <b>3</b>
                  </div>
                  <ArrowRight size={20} className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'/>
                </Button>
            </div>
          </div>
        </Container>
        </header>
    )
}