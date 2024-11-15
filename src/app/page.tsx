import { Container, Title, TopBar, Filters, ProductCard } from "@/components/shared";

export default function Home() {
  return (
    <>
     <Container className="mt-8">
      <Title text="All pizzas" size="lg" className="font-extrabold ml-4"/>      
     </Container>
     <TopBar className="pl-6 pr-4"/>
     
     <Container className="pb-14 pl-6 mt-8">
      <div className="flex gap-[60px]">
        {/* Filter */}
        <div className="w-[250px]">
         <Filters/>
        </div>
        {/* List products */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
           <ProductCard id={0} name="Margarita" price={70} imageUrl={'https://media.istockphoto.com/id/1168754685/photo/pizza-margarita-with-cheese-top-view-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=psLRwd-hX9R-S_iYU-sihB4Jx2aUlUr26fkVrxGDfNg='}/>
          </div>
        </div>
      </div>
     </Container>
    </>
  );
}
