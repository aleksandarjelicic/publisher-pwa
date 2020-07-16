const Listing = ({ items }) => {
  return (
    <div>
      {items.map((item) => {
        return (
          <div>
            <h3>{item.title}</h3>
            <p>{item.lead}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Listing;
