const ButtonLoadMore = ({ onClick, loading }) => {
  return (
    <button
      className="btn btn--load"
      style={{ margin: "2em auto", display: "block" }}
      onClick={onClick}
      disabled={loading}
    >
      <span className="btn__spin"></span>
      load more
    </button>
  );
};

export default ButtonLoadMore;
