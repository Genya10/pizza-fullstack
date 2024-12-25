import { Container, Title, TopBar, Filters } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { prisma } from "../../prisma/prisma-client";

export default async function Home() {

 const categories = await prisma.category.findMany({
  include:{
    products: {
      include: {
        ingredients:true,
        items: true,
      }
    }
  }
 })

 console.log(categories)

  return (
    <>
     <Container className="mt-8">
      <Title text="All pizzas" size="lg" className="font-extrabold ml-4"/>      
     </Container>
     <TopBar className="pl-6 pr-4"/>
     
     <Container className="pb-14 pl-6 mt-8">
      <div className="flex gap-[80px]">
        {/* Filter */}
        <div className="w-[250px]">
         <Filters/>
        </div>
        {/* List products */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            
           <ProductsGroupList 
              title="Pizzas" 
              items={[
               {
                id:1,
                name:'Cheses-pizza',
                imageUrl:'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg=',
                price: 70,
                items:[{price:70}]
               },

            ]} 
              categoryId={1}/>

        {/* <ProductsGroupList 
              title="Chisburgers" 
              items={[
               {
                id:1,
                name:'Cheses-pizza',
                imageUrl:'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
                price: 70,
                items:[{price:70}]
               },
               {
                id:2,
                name:'Cheses-pizza',
                imageUrl:'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
                price: 70,
                items:[{price:70}]
               },
               {
                id:3,
                name:'Cheses-pizza',
                imageUrl:'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
                price: 70,
                items:[{price:70}]
               },
               {
                id:4,
                name:'Cheses-pizza',
                imageUrl:'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
                price: 70,
                items:[{price:70}]
               },
               {
                id:5,
                name:'Cheses-pizza',
                imageUrl:'https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=',
                price: 70,
                items:[{price:70}]
               },
            ]} 
              categoryId={2}/> */}
          </div>
        </div>
      </div>
     </Container>
    </>
  );
}
