import Footer4 from "@/components/footer/Footer4";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import Hero from "./components/Hero";
import ListingForms from "./components/ListingForms";

const ListingAddListing = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <ListingForms />
      </main>
      <Footer4 />
    </>
  );
};

export default ListingAddListing;
