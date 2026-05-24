import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import Footer1 from "@/components/footer/Footer1";
import Hero from "./components/Hero";
import TourBookingDetails from "./components/TourBookingDetails";

const ToursBooking = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <TourBookingDetails />
      </main>
      <Footer1 />
    </>
  );
};

export default ToursBooking;
