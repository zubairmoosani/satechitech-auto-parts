import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import ActionBox from "./components/ActionBox";
import Hero from "./components/Hero";
import OurListings from "./components/OurListings";

const CompareListing = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <OurListings />
        <ActionBox />
      </main>
      <Footer1 />
    </>
  );
};

export default CompareListing;
