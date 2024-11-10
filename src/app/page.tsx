import { Container, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
     <Container className="mt-8">
      <Title text="All pizzas" size="lg" className="font-extrabold ml-4"/>      
     </Container>
     <TopBar/>
    </>
  );
}
