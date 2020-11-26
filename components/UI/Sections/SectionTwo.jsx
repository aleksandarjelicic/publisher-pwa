import ArticleHeroSmall from "../Articles/ArticleHeroSmall";
import LinkOffline from "../LinkOffline";

const SectionTwo = ({ articles, name, moreUrl }) => {
  return (
    <>
      <h2 className="section__hdl">
        <LinkOffline href={moreUrl}>
          <a>{name}</a>
        </LinkOffline>
      </h2>

      <div className="grid grid--boxed">
        {articles.map((item, index) => (
          <div
            className="grid__item gi-xsmall-12 gi-medium-6"
            key={name.replace(/\s/g, "") + index}
          >
            <ArticleHeroSmall article={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionTwo;
