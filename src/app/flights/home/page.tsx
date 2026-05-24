import TopNavBar5 from "@/components/TopNav/TopNavBar5";
import ActionBox from "./components/ActionBox";
import BlogsAndNews from "./components/BlogsAndNews";
import ContainedFooter from "./components/ContainedFooter";
import DestinationSteps from "./components/DestinationSteps";
import Hero from "./components/Hero";
import PopularDestinations from "./components/PopularDestinations";
import SpecialOffers from "./components/SpecialOffers";


const FlightHome = () => {
  return (
    <>
      <TopNavBar5 />
      <main>
        <Hero />
        <SpecialOffers />
        <PopularDestinations />
        <DestinationSteps />
        <ActionBox />
        <BlogsAndNews />
      </main>
      <ContainedFooter />
    </>
  );
};

export default FlightHome;
