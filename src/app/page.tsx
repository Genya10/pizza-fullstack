import { Button } from "@/components/ui/button"
import { Categories, Container, Title } from "@/components/shared";

export default function Home() {
  return (
    <>
     <Container className="mt-8">
      <Title text="All pizzas" size="lg" className="font-extrabold"/>
      <Categories/>
     </Container>
    </>
  );
}
