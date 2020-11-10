const ButtonLoadMore = ({ onClick, loading }) => {
  return (
    <button
      className="btn btn--load center"
      onClick={onClick}
      disabled={loading}
    >
      <span className="btn__spin"></span>
      load more
    </button>
  );
};

export default ButtonLoadMore;
