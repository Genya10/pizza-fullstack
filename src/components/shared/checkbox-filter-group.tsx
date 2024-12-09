'use client'

import React from 'react'
import { Input, Skeleton } from '../ui'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'

type Item = FilterChecboxProps

interface Props {
 title: string
 items: Item[]
 defaultItems: Item[]
 limit?: number
 loading?: boolean
 searchInputPlaceholder?: string
 onClickCheckbox:(id: string) => void
 defaultValue?: string[]
 className?: string
}

export const CheckboxFilterGroup: React.FC<Props> = (
   {
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder='Search...',
    className,
    loading,
    onClickCheckbox,
    defaultValue
   }
) => {

   const [showAll, setShowAll] = React.useState(false)
   const [searchValue, setSearchValue] = React.useState('')

   const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
   }

   if(loading){
    return (
      <div className={className}>
        <p className='font-bold'>{title}</p>
        {...Array(limit)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className='h-6 mb-4'/>
        ))}
      </div>)
   }

   const list = showAll
     ? items.filter((item)=> item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
     : defaultItems.slice(0, limit)

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            {showAll && (
             <div className='mb-5'>
              <Input 
                 onChange={onChangeSearchInput}
                 placeholder={searchInputPlaceholder} 
                 className='bg-gray-50 border-none'/>
             </div>
            )}
         
            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
              {list.map((item, index) => (
                <FilterCheckbox 
                  key={index}
                  text={item.text}
                  value={item.value}
                  endAdornment={item.endAdornment}
                  checked={false}
                  onCheckedChange={() => onClickCheckbox?.(item.value)}
                />
              ))}
            </div>

            {items.length > limit && (
              <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                <button onClick={()=> setShowAll(!showAll)} className='text-primary mt-3'>
                 {showAll ? 'hide' : 'show all'}
                </button>
              </div>
            )}

            <button 
              onClick={() => {
              setShowAll(prev => {
              console.log('Button clicked, updating showAll to:', !prev);
              return !prev;
                  });
                }} 
                className='text-primary mt-3'
              >
                {showAll ? 'hide' : 'show all'}
            </button>
        </div>
    )
}