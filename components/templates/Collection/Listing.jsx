import Item from "./Item";

const Listing = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => {
        return <Item key={item.slug + "-" + index} item={item} />;
      })}
    </div>
  );
};

export default Listing;
