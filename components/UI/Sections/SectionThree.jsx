import ArticleList from "../Articles/ArticleList";
import LinkOffline from "../LinkOffline";

const SectionThree = ({ articles, name, moreUrl = null }) => {
  return (
    <>
      <h2 className="section__hdl">
        {moreUrl ? (
          <LinkOffline href={moreUrl}>
            <a>{name}</a>
          </LinkOffline>
        ) : (
          <span>{name}</span>
        )}
      </h2>
      {articles.map((item, index) => (
        <ArticleList article={item} key={name.replace(/\s/g, "") + index} />
      ))}
    </>
  );
};

export default SectionThree;
