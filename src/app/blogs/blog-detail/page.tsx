import Footer1 from "@/components/footer/Footer1";
import TopNavBar2 from "@/components/TopNav/TopNavBar2";
import BlogDetails from "./components/BlogDetails";
import Hero from "./components/Hero";

const BlogDetail = () => {
  return (
    <>
      <TopNavBar2 />

      <main>
        <Hero />
        <BlogDetails />
      </main>

      <Footer1 />
    </>
  );
};

export default BlogDetail;
