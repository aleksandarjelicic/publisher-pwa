import Store from "../../Store";

const SectionCustomTemplate = () => {
  return (
    <Store.Consumer>
      {(store) => (
        <div>
          <h1>custom section template</h1>
          {store.route.name}
        </div>
      )}
    </Store.Consumer>
  );
};

export default SectionCustomTemplate;
