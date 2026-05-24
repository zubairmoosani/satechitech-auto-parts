import Footer1 from "@/components/footer/Footer1";
import BookingSearch from "./components/BookingSearch";
import TopNavBar9 from "./components/TopNavBar9";
import TripCategories from "./components/TripCategories";

const page = () => {
  return (
    <>
      <TopNavBar9 />
      <main>
        <BookingSearch />
        <TripCategories />
      </main>
      <Footer1 />
    </>
  );
};

export default page;
