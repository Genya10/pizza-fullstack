import { Title, FilterCheckbox } from "@/components/shared";

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
    return (
        <div className={className}>
         <Title text="Filtration" size="sm" className="mb-5 font-bold"/>
        
        <div className="flex flex-col gap-4">
          <FilterCheckbox text='Can be collected' value='1'/>
          <FilterCheckbox  text='New items' value='2'/>
        </div>
        </div>
    )
}