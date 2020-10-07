import ArticleHero from "../../UI/Articles/ArticleHero";
import ArticleList from "../../UI/Articles/ArticleList";

const Listing = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        if (index === 0)
          return <ArticleHero article={item} key={item.slug + "-" + index} />;
        return <ArticleList article={item} key={item.slug + "-" + index} />;
      })}
    </>
  );
};

export default Listing;
