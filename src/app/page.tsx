import Header from "@/app/components/header";
import Hero from "@/app/components/hero";
import { PopularCityList } from "@/app/components/popularCityList";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularCityList />
    </>
  );
}
