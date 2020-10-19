import Link from "next/link";

const AuthorsList = ({ authors, className = "" }) => {
  return authors && authors.length ? (
    <div style={{ display: "inline", marginLeft: "1em" }}>
      {authors.map((item, index) => (
        <span className={className} key={"author" + index}>
          {index > 0 ? ", " : null}
          <Link href="/[...slug]" as={"/author/" + item.swp_author.slug}>
            <a>{item.swp_author.name}</a>
          </Link>
        </span>
      ))}
    </div>
  ) : null;
};

export default AuthorsList;
