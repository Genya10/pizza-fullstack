import { Ingredient } from "@prisma/client"
import React from "react"
import { Api } from "../../services/api-client"
import { useSet } from "react-use"

type IngredientItem = Pick<Ingredient, 'id' | 'name'>

interface ReturnProps {
    ingredients: IngredientItem[]
    loading: boolean
    selectedIds: Set<string>
    onAddId: (id: string) => void
}

export const useFilterIngredients = (values: string[]=[]): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([])
    // React.useState<Ingredient[]>([])
    const [loading, setLoading] = React.useState(true)

    const [selectedIds, {toggle}] = useSet(new Set<string>(values))

    React.useEffect(() => {
        async function fetchIngredients(){
            try {
                setLoading(true)
                const ingredients = await Api.ingredients.getAll()
                setIngredients(ingredients)                   
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchIngredients()
    },[])

    return {
            ingredients,
            loading,
            onAddId: toggle,
            selectedIds,        
          }
}