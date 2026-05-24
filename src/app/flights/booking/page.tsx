import Footer1 from "@/components/footer/Footer1";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import PaymentDetails from "./components/PaymentDetails";

const FlightBooking = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <PaymentDetails />
      </main>
      <Footer1 />
    </>
  );
};

export default FlightBooking;
