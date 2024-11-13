import { Title, FilterCheckbox, RangeSlider, CheckboxFilterGroup } from "@/components/shared";
import { Input } from "../ui";

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
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
         <RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>
         </div>
         <CheckboxFilterGroup 
           title="Ingridients"
           className="mt-5"
           limit={6}
           defaultItems={[
            {text:'Ham', value:'1'},
            {text:'Potato', value:'2'},
            {text:'Cheese', value:'3'},
            {text:'Becon', value:'4'},
            {text:'Tomato', value:'5'},
            {text:'Mozarella', value:'6'},
           ]}
           items={[
            {text:'Ham', value:'1'},
            {text:'Potato', value:'2'},
            {text:'Cheese', value:'3'},
            {text:'Becon', value:'4'},
            {text:'Tomato', value:'5'},
            {text:'Mozarella', value:'6'},
           ]}
         />
        </div>
    )
}