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
     <TopBar className="pl-6 pr-4" categories={categories.filter((category) => category.products.length > 0)}/>
     
     <Container className="pb-14 pl-6 mt-8">
      <div className="flex gap-[80px]">
        {/* Filter */}
        <div className="w-[250px]">
         <Filters/>
        </div>
        {/* List products */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {categories.map(
              (category) => 
                category.products.length > 0 && (
                <ProductsGroupList 
                  key={category.id}
                  title={category.name} 
                  categoryId={category.id}
                  items={category.products} 
                 />    
                )
            )}

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
