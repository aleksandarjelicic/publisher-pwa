import Item from "./Item";

const Listing = ({ items }) => {
  return (
    <div>
      {items.map((item) => {
        return <Item item={item} />;
      })}
    </div>
  );
};

export default Listing;
