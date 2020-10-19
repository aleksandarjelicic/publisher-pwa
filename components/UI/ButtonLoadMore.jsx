const ButtonLoadMore = ({ onClick, loading }) => {
  return (
    <button
      style={{ margin: "2em auto", display: "block" }}
      onClick={onClick}
      disabled={loading}
    >
      load more
    </button>
  );
};

export default ButtonLoadMore;
