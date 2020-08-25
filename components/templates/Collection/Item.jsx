import Link from "next/link";
import Image from "../../UI/Image";

const item = ({ item }) => {
  let href = item.swp_route.staticprefix + "/" + item.slug;

  return (
    <div>
      <Link href="/[...slug]" as={href}>
        <a>
          {item.swp_article_feature_media && (
            <Image
              renditions={item.swp_article_feature_media.renditions}
              srcSet={[
                { name: "400x240", minWidth: "", maxWidth: "600" },
                { name: "600x360", minWidth: "601", maxWidth: "960" },
                { name: "960x480", minWidth: "961" },
              ]}
              fallbackRendition="400x240"
              thumbnailRendition="300x220"
              width={960}
              height={480}
            />
          )}
          <h3>{item.title} </h3>
          {item.swp_article_authors && item.swp_article_authors.length ? (
            <p>
              Author:
              {item.swp_article_authors.map((item, index) => (
                <span key={item.slug + "author" + index}>
                  {" "}
                  {item.swp_author.name}
                </span>
              ))}
            </p>
          ) : null}
        </a>
      </Link>

      <p>{item.lead}</p>
    </div>
  );
};

export default item;
