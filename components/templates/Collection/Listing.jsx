import ArticleHero from "../../UI/Articles/ArticleHero";
import ArticleList from "../../UI/Articles/ArticleList";

const Listing = ({ items, allSmall = false }) => {
  return (
    <>
      {items.map((item, index) => {
        if (index === 0 && !allSmall)
          return <ArticleHero article={item} key={item.slug + "-" + index} />;
        return <ArticleList article={item} key={item.slug + "-" + index} />;
      })}
    </>
  );
};

export default Listing;
