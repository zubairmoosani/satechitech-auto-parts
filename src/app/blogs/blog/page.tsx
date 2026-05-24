import Footer1 from "@/components/footer/Footer1";
import TopNavBar2 from "@/components/TopNav/TopNavBar2";
import BlogList from "./components/BlogList";
import LatestArticle from "./components/LatestArticle";
import Newsletter from "./components/Newsletter";

const Blog = () => {
  return (
    <>
      <TopNavBar2 />
      <main>
        <BlogList />
        <LatestArticle />
        <Newsletter />
      </main>
      <Footer1 />
    </>
  );
};

export default Blog;
