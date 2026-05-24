import Footer1 from "@/components/footer/Footer1";
import About from "./components/About";
import ActionBox from "./components/ActionBox";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import NearbyPlaces from "./components/NearbyPlaces";
import Services from "./components/Services";
import SpecialOfferSlider from "./components/SpecialOfferSlider";
import TopNavBar2 from "./components/TopNavBar2";

const HotelChain = () => {
  return (
    <>
      <TopNavBar2 />
      <main>
        <Hero />
        <SpecialOfferSlider />
        <About />
        <NearbyPlaces />
        <Services />
        <ActionBox />
        <Gallery />
      </main>
      <Footer1 />
    </>
  );
};

export default HotelChain;
