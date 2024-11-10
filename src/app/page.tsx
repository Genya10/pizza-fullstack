import { Container, Title, TopBar, Filters } from "@/components/shared";

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
           List products
          </div>
        </div>
      </div>
     </Container>
    </>
  );
}
