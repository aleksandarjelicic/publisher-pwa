const SectionMost = () => {
  return (
    <div className="tabs">
      <ul className="tabs__nav">
        <li>
          <a href="#tab1" className="tabs__item tabs__item--active">
            Latest
          </a>
        </li>
        <li>
          <a href="#tab2" className="tabs__item">
            Most read
          </a>
        </li>
      </ul>
      <div id="tab1" className="tabs__content">
        <article className="briefList">
          <time className="briefList__time" dateTime="2020-09-09 14:20:00">
            20 min ago
          </time>
          <h3 className="briefList__hdl">
            <a href="#">
              Tear gas, flares, clashes and splashes: France's strike in
              pictures
            </a>
          </h3>
        </article>
        <article className="briefList">
          <time className="briefList__time" dateTime="2020-09-09 14:20:00">
            20 min ago
          </time>
          <h3 className="briefList__hdl">
            <a href="#">
              Tear gas, flares, clashes and splashes: France's strike in
              pictures
            </a>
          </h3>
        </article>
        <article className="briefList">
          <time className="briefList__time" dateTime="2020-09-09 14:20:00">
            20 min ago
          </time>
          <h3 className="briefList__hdl">
            <a href="#">
              Tear gas, flares, clashes and splashes: France's strike in
              pictures
            </a>
          </h3>
        </article>
        <article className="briefList">
          <time className="briefList__time" dateTime="2020-09-09 14:20:00">
            20 min ago
          </time>
          <h3 className="briefList__hdl">
            <a href="#">
              Tear gas, flares, clashes and splashes: France's strike in
              pictures
            </a>
          </h3>
        </article>
        <article className="briefList">
          <time className="briefList__time" dateTime="2020-09-09 14:10:00">
            30 min ago
          </time>
          <h3 className="briefList__hdl">
            <a href="#">
              Tear gas, flares, clashes and splashes: France's strike in
              pictures
            </a>
          </h3>
        </article>
      </div>
    </div>
  );
};

export default SectionMost;
