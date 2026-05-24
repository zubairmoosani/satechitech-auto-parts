import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import Hero from "./components/Hero";
import TourInformation from "./components/TourInformation";

const ToursDetail = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <TourInformation />
      </main>
      <Footer1 />
    </>
  );
};

export default ToursDetail;
