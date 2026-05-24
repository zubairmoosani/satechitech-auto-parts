import Footer2 from "@/components/footer/Footer2";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import BookingDetails from "./components/BookingDetails";
import Hero from "./components/Hero";

const HotelBooking = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <BookingDetails />
      </main>
      <Footer2 />
    </>
  );
};

export default HotelBooking;
