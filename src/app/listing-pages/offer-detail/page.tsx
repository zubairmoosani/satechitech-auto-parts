import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import Hero from "./components/Hero";
import OfferDetails from "./components/OfferDetails";

const OfferDetail = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <OfferDetails />
      </main>
      <Footer1 />
    </>
  );
};

export default OfferDetail;
