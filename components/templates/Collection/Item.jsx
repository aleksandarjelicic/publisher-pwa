import Link from "next/link";

const item = ({ item }) => {
  let href = item.swp_route.staticprefix + "/" + item.slug;

  return (
    <div>
      <h3>
        <Link href="/[...slug]" as={href}>
          <a>{item.title}</a>
        </Link>
      </h3>
      <p>{item.lead}</p>
    </div>
  );
};

export default item;
