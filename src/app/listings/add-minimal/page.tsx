import Footer4 from "@/components/footer/Footer4";
import TopNavBar1 from "@/components/TopNav/TopNavBar1";
import Hero from "./components/Hero";
import MinimalListing from "./components/MinimalListing";

const ListingAddMinimal = () => {
  return (
    <>
      <TopNavBar1 />

      <main>
        <Hero />
        <MinimalListing />
      </main>
      <Footer4 />
    </>
  );
};

export default ListingAddMinimal;
