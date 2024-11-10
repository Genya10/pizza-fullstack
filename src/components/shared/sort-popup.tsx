import { cn } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"

interface Props {
    className?: string
}

export const SortPopup: React.FC<Props> = ({className}) => {

    return (
        <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px]',className)}>
         <ArrowUpDown size={16}/>
         <b>Sorting:</b>
         <b className="text-primary">popular</b>
        </div>
    )
}