import ArticleList from "../Articles/ArticleList";
import Link from "next/link";

const SectionThree = ({ articles, name, moreUrl }) => {
  return (
    <>
      <h2 className="section__hdl">
        <Link href="/[...slug]" as={moreUrl}>
          <a>{name}</a>
        </Link>
      </h2>
      {articles.map((item, index) => (
        <ArticleList article={item} key={name.replace(/\s/g, "") + index} />
      ))}
    </>
  );
};

export default SectionThree;
