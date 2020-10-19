import moment from "moment";

const Time = ({ value }) => {
  return (
    <time
      className="article__time"
      dateTime={moment(value).format("YYYY-MM-DD hh:mm:ii")}
    >
      {moment(value).format("DD MMMM YYYY")}
    </time>
  );
};

export default Time;
