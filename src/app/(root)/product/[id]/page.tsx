import { notFound } from "next/navigation"
import { prisma } from "../../../../prisma/prisma-client"
import { Container, ProductImage, Title } from "@/components/shared"
import { GroupVariants } from "@/components/shared/group-variants"

export default async function ProductPage({params: {id}}:{params:{id: string}}) {//?
  const product = await prisma.product.findFirst({where:{id: Number(id)}})

  if(!product){
    return notFound()
  }

  return (
    <Container className="flex  my-10">
      <div className="flex flex-1">
      <ProductImage imageUrl={product.imageUrl} size={40}/>
      </div>

      <div className="w-[490px] bg-[#FCFCFC] p-7">
       <Title text={product.name} size="md" className="font-extrabold mb-1"/>
       <p className="text-gray-400">Lorem Lorem Lorem </p>  
       <GroupVariants 
        selectedValue="3"
         items={[
          {
            name:'Little',
            value: '1'
          },
          {
            name:'Middle',
            value:'2',
            disabled: true
          },
          {
            name:'Large',
            value:'3'
          }
         ]}
       />
      </div>
    </Container>
  )
}