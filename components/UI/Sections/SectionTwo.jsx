import ArticleHeroSmall from "../Articles/ArticleHeroSmall";
import Link from "next/link";

const SectionTwo = ({ articles, name, moreUrl, smallHeadline }) => {
  return (
    <>
      <h2 className="section__hdl">
        <Link href={moreUrl}>
          <a>{name}</a>
        </Link>
      </h2>

      <div className="grid grid--boxed">
        {articles.map((item, index) => (
          <div
            className="grid__item gi-xsmall-12 gi-medium-6"
            key={name.replace(/\s/g, "") + index}
          >
            <ArticleHeroSmall article={item} smallHeadline={smallHeadline} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionTwo;
