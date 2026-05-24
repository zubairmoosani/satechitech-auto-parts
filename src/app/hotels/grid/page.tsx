import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import Hero from "./components/Hero";
import HotelGridLayout from "./components/HotelGridLayout";
import HotelListFilter from "./components/HotelListFilter";

const HotelGrid = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <HotelListFilter />
        <HotelGridLayout />
      </main>
      <Footer1 />
    </>
  );
};

export default HotelGrid;
