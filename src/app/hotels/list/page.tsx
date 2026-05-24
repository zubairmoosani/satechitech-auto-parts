import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import Hero from "./components/Hero";
import HotelLists from "./components/HotelLists";

const HotelList = () => {
  return (
    <>
        <TopNavBar1 />
      <main>
        <Hero />
        <HotelLists />
      </main>
      <Footer1 />
    </>
  );
};

export default HotelList;
