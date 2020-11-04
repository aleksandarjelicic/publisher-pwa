import ArticleList from "../Articles/ArticleList";
import Link from "next/link";
import Image from "../Image";

const SectionTopic = ({ articles, name, moreUrl }) => {
  const imageArticle = articles.find(
    (item) => item.article.swp_article_feature_media
  );

  return (
    <section className="topic">
      {imageArticle ? (
        <Image
          renditions={imageArticle.article.swp_article_feature_media.renditions}
          srcSet={[
            { name: "440x292", maxWidth: "440" },
            { name: "708x471", minWidth: "441" },
          ]}
          fallbackRendition="440x292"
          width={708}
          height={471}
          className="topic__img"
        />
      ) : null}

      <div className="topic__wrap">
        <span className="topic__text">Latest news for</span>
        <h2 className="topic__hdl">{name}</h2>
        {articles.map((item, index) => (
          <ArticleList
            showImage={false}
            article={item.article}
            key={name.replace(/\s/g, "") + index}
          />
        ))}

        <Link href={moreUrl}>
          <a className="btnLink">&gt; More about {name}</a>
        </Link>
      </div>
    </section>
  );
};

export default SectionTopic;
