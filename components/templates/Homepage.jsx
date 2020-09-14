import { getContentList } from "../../services/contentListService";
import React from "react";
import { motion } from "framer-motion";
import Store from "../Store";
import { pageTransitions } from "../../config/framerMotionAnimations";
import UniversalHead from "../layout/UniversalHead";
import Item from "./Collection/Item";

class Homepage extends React.Component {
  static contextType = Store;

  static getProps = async (context) => {
    const list = await getContentList("AAA");
    const list2 = await getContentList("auto2", 1, 10);

    return {
      list: list,
      list2: list2,
    };
  };

  state = {
    list2: {
      name: this.context.data.list2.name,
      items: this.context.data.list2.items,
      currentPage: this.context.data.list2.metadata.aggregate.currentPage,
      pagesCount: this.context.data.list2.metadata.aggregate.pagesCount || 0,
      showLoadMore: this.context.data.list2.metadata.aggregate.pagesCount
        ? true
        : false,
      limit: 10,
      loading: false,
    },
  };

  loadMoreList2 = async () => {
    if (this.state.list2.currentPage >= this.state.list2.pagesCount) return;
    this.setState({ list2: { ...this.state.list2, loading: true } });
    const page = this.state.list2.currentPage + 1;

    const data = await getContentList(
      this.state.list2.name,
      page,
      this.state.list2.limit
    );

    const showLoadMore =
      data.metadata.aggregate.currentPage >= data.metadata.aggregate.pagesCount
        ? false
        : true;
    this.setState({
      list2: {
        items: [...this.state.list2.items, ...data.items],
        currentPage: data.metadata.aggregate.currentPage,
        pagesCount: data.metadata.aggregate.pagesCount,
        showLoadMore,
        loading: false,
      },
    });
  };

  render() {
    return (
      <>
        <UniversalHead />
        <Store.Consumer>
          {(store) => (
            <motion.div
              initial={pageTransitions.initial}
              animate={pageTransitions.animate}
              exit={pageTransitions.exit}
            >
              <article className="hero hero--cover">
                <a href="#">
                  <figure className="hero__img">
                    <img src="img/cover-img.jpg" alt="" />
                  </figure>
                  <div className="hero__text hero__text--cover">
                    <span className="hero__kicker">Gilets jaunes movement</span>
                    <h2 className="hero__hdl hero__hdl--cover">
                      Tear gas, flares, clashes and splashes: France's strike in
                      pictures
                    </h2>
                    <p className="hero__lead">
                      Public sector workers in France continue to bring
                      transportation in the country to a virtual standstill as
                      they protest pension reforms.
                    </p>
                  </div>
                </a>
              </article>
              <div className="mainCols">
                <div className="main--left">
                  <article className="list">
                    <figure className="list__img">
                      <a href="#">
                        <img src="img/article-img.jpg" alt="" />
                      </a>
                    </figure>
                    <div className="list__text">
                      <span className="list__kicker">
                        <a href="#">Gilets jaunes movement</a>
                      </span>
                      <h3 className="list__hdl">
                        <a href="#">
                          Tear gas, flares, clashes and splashes: France's
                          strike in pictures
                        </a>
                      </h3>
                      <p className="list__lead">
                        Public sector workers in France continue to bring
                        transportation in the country to a virtual standstill as
                        they protest pension reforms.
                      </p>
                    </div>
                  </article>
                  <article className="list">
                    <figure className="list__img">
                      <a href="#">
                        <img src="img/article-img.jpg" alt="" />
                      </a>
                    </figure>
                    <div className="list__text">
                      <span className="list__kicker">
                        <a href="#">Gilets jaunes movement</a>
                      </span>
                      <h3 className="list__hdl">
                        <a href="#">
                          Tear gas, flares, clashes and splashes: France's
                          strike in pictures
                        </a>
                      </h3>
                      <p className="list__lead">
                        Public sector workers in France continue to bring
                        transportation in the country to a virtual standstill as
                        they protest pension reforms.
                      </p>
                    </div>
                  </article>
                  <article className="hero">
                    <a href="#">
                      <figure className="hero__img">
                        <img src="img/hero-img.jpg" alt="" />
                      </figure>
                      <div className="hero__text">
                        <span className="hero__kicker">
                          Gilets jaunes movement
                        </span>
                        <h2 className="hero__hdl">
                          Tear gas, flares, clashes and splashes: France's
                          strike in pictures
                        </h2>
                        <p className="hero__lead">
                          Public sector workers in France continue to bring
                          transportation in the country to a virtual standstill
                          as they protest pension reforms.
                        </p>
                      </div>
                    </a>
                  </article>
                  <section className="topic">
                    <figure className="topic__img">
                      <img src="img/topic-img.jpg" alt="" />
                    </figure>
                    <div className="topic__wrap">
                      <span className="topic__text">Latest news for</span>
                      <h2 className="topic__hdl">
                        <a href="#">Corona virus</a>
                      </h2>
                      <article className="list">
                        <div className="list__text">
                          <span className="list__kicker">
                            <a href="#">Gilets jaunes movement</a>
                          </span>
                          <h3 className="list__hdl">
                            <a href="#">
                              Tear gas, flares, clashes and splashes: France's
                              strike in pictures
                            </a>
                          </h3>
                          <p className="list__lead">
                            Public sector workers in France continue to bring
                            transportation in the country to a virtual
                            standstill as they protest pension reforms.
                          </p>
                        </div>
                      </article>
                      <article className="list">
                        <div className="list__text">
                          <span className="list__kicker">
                            <a href="#">Gilets jaunes movement</a>
                          </span>
                          <h3 className="list__hdl">
                            <a href="#">
                              Tear gas, flares, clashes and splashes: France's
                              strike in pictures
                            </a>
                          </h3>
                          <p className="list__lead">
                            Public sector workers in France continue to bring
                            transportation in the country to a virtual
                            standstill as they protest pension reforms.
                          </p>
                        </div>
                      </article>
                      <a href="#" className="btnLink">
                        > More about Corona virus
                      </a>
                    </div>
                  </section>
                </div>
                <div className="main--right">
                  <div className="tabs">
                    <ul className="tabs__nav">
                      <li>
                        <a
                          href="#tab1"
                          className="tabs__item tabs__item--active"
                        >
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
                        <time
                          className="briefList__time"
                          dateTime="2020-09-09 14:20:00"
                        >
                          20 min ago
                        </time>
                        <h3 className="briefList__hdl">
                          <a href="#">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </a>
                        </h3>
                      </article>
                      <article className="briefList">
                        <time
                          className="briefList__time"
                          dateTime="2020-09-09 14:10:00"
                        >
                          30 min ago
                        </time>
                        <h3 className="briefList__hdl">
                          <a href="#">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </a>
                        </h3>
                      </article>
                    </div>
                  </div>
                  <section className="section--small">
                    <h2 className="section__hdl section__hdl--small">
                      Opinions
                    </h2>
                    <article className="hero hero--small">
                      <a href="#">
                        <figure className="hero__img">
                          <img src="img/half-img.jpg" alt="" />
                        </figure>
                        <div className="hero__text hero__text--small">
                          <span className="hero__kicker">Ljuba Ranković</span>
                          <h2 className="hero__hdl hero__hdl--small">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </h2>
                        </div>
                      </a>
                    </article>
                    <article className="briefList">
                      <span className="briefList__kicker">Ljuba Ranković</span>
                      <h3 className="briefList__hdl">
                        <a href="#">
                          Tear gas, flares, clashes and splashes: France's
                          strike in pictures
                        </a>
                      </h3>
                    </article>
                    <article className="briefList">
                      <span>Ljuba Ranković</span>
                      <h3 className="briefList__hdl">
                        <a href="#">
                          Tear gas, flares, clashes and splashes: France's
                          strike in pictures
                        </a>
                      </h3>
                    </article>
                  </section>
                  <div className="ad">
                    <div
                      style={{
                        width: "300px",
                        height: "300px",
                        background: "#D9D9D9",
                        padding: "10px",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>Advertisement</span>
                    </div>
                  </div>
                  <article className="hero hero--small">
                    <a href="#">
                      <figure className="hero__img">
                        <img src="img/half-img.jpg" alt="" />
                        <img
                          className="icon"
                          src="img/icon-gallery.svg"
                          alt=""
                        />
                      </figure>
                      <div className="hero__text hero__text--small">
                        <span className="hero__kicker">Gallery</span>
                        <h2 className="hero__hdl hero__hdl--small">
                          Tear gas, flares, clashes and splashes: France's
                          strike in pictures
                        </h2>
                      </div>
                    </a>
                  </article>
                </div>
              </div>
              <div className="mainCols">
                <div className="main--left">
                  <section className="section">
                    <h2 className="section__hdl">
                      <a href="#">Politics</a>
                    </h2>
                    <article className="list">
                      <figure className="list__img">
                        <a href="#">
                          <img src="img/article-img.jpg" alt="" />
                        </a>
                      </figure>
                      <div className="list__text">
                        <span className="list__kicker">
                          <a href="#">Gilets jaunes movement</a>
                        </span>
                        <h3 className="list__hdl">
                          <a href="#">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </a>
                        </h3>
                        <p className="list__lead">
                          Public sector workers in France continue to bring
                          transportation in the country to a virtual standstill
                          as they protest pension reforms.
                        </p>
                      </div>
                    </article>
                    <h2 className="section__hdl">
                      <a href="#">Business</a>
                    </h2>
                    <article className="list">
                      <figure className="list__img">
                        <a href="#">
                          <img src="img/article-img.jpg" alt="" />
                        </a>
                      </figure>
                      <div className="list__text">
                        <span className="list__kicker">
                          <a href="#">Gilets jaunes movement</a>
                        </span>
                        <h3 className="list__hdl">
                          <a href="#">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </a>
                        </h3>
                        <p className="list__lead">
                          Public sector workers in France continue to bring
                          transportation in the country to a virtual standstill
                          as they protest pension reforms.
                        </p>
                      </div>
                    </article>
                    <article className="list">
                      <figure className="list__img">
                        <a href="#">
                          <img src="img/article-img.jpg" alt="" />
                        </a>
                      </figure>
                      <div className="list__text">
                        <span className="list__kicker">
                          <a href="#">Gilets jaunes movement</a>
                        </span>
                        <h3 className="list__hdl">
                          <a href="#">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </a>
                        </h3>
                        <p className="list__lead">
                          Public sector workers in France continue to bring
                          transportation in the country to a virtual standstill
                          as they protest pension reforms.
                        </p>
                      </div>
                    </article>
                  </section>
                </div>
                <div className="main--right">
                  <div className="ad ad--sticky">
                    <div
                      style={{
                        width: "300px",
                        height: "300px",
                        background: "#D9D9D9",
                        padding: "10px",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>Advertisement</span>
                    </div>
                  </div>
                </div>
              </div>
              <section className="section">
                <h2 className="section__hdl">
                  <a href="#">Local</a>
                </h2>
                <div className="grid grid--boxed">
                  <div className="grid__item gi-xsmall-12 gi-medium-6">
                    <article className="hero hero--small">
                      <a href="#">
                        <figure className="hero__img">
                          <img src="img/half-img.jpg" alt="" />
                        </figure>
                        <div className="hero__text hero__text--small">
                          <span className="hero__kicker">
                            Gilets jaunes movement
                          </span>
                          <h2 className="hero__hdl">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </h2>
                        </div>
                      </a>
                    </article>
                  </div>
                  <div className="grid__item gi-xsmall-12 gi-medium-6">
                    <article className="hero hero--small">
                      <a href="#">
                        <figure className="hero__img">
                          <img src="img/half-img.jpg" alt="" />
                        </figure>
                        <div className="hero__text hero__text--small">
                          <span className="hero__kicker">
                            Gilets jaunes movement
                          </span>
                          <h2 className="hero__hdl">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </h2>
                        </div>
                      </a>
                    </article>
                  </div>
                </div>
              </section>
              <div className="mainCols">
                <div className="main--left">
                  <section className="section">
                    <h2 className="section__hdl">
                      <a href="#">Culture</a>
                    </h2>
                    <article className="list">
                      <figure className="list__img">
                        <a href="#">
                          <img src="img/article-img.jpg" alt="" />
                        </a>
                      </figure>
                      <div className="list__text">
                        <span className="list__kicker">
                          <a href="#">Gilets jaunes movement</a>
                        </span>
                        <h3 className="list__hdl">
                          <a href="#">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </a>
                        </h3>
                        <p className="list__lead">
                          Public sector workers in France continue to bring
                          transportation in the country to a virtual standstill
                          as they protest pension reforms.
                        </p>
                      </div>
                    </article>

                    <article className="list">
                      <figure className="list__img">
                        <a href="#">
                          <img src="img/article-img.jpg" alt="" />
                        </a>
                      </figure>
                      <div className="list__text">
                        <span className="list__kicker">
                          <a href="#">Gilets jaunes movement</a>
                        </span>
                        <h3 className="list__hdl">
                          <a href="#">
                            Tear gas, flares, clashes and splashes: France's
                            strike in pictures
                          </a>
                        </h3>
                        <p className="list__lead">
                          Public sector workers in France continue to bring
                          transportation in the country to a virtual standstill
                          as they protest pension reforms.
                        </p>
                      </div>
                    </article>
                  </section>
                </div>
                <div className="main--right">
                  <div className="ad ad--sticky">
                    <div
                      style={{
                        width: "300px",
                        height: "300px",
                        background: "#D9D9D9",
                        padding: "10px",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>Advertisement</span>
                    </div>
                  </div>
                </div>
              </div>
              <article className="hero hero--cover marginBottom0">
                <a href="#">
                  <figure className="hero__img">
                    <img src="img/cover-img.jpg" alt="" />
                    <img
                      className="icon icon--hero"
                      src="img/icon-gallery.svg"
                      alt=""
                    />
                  </figure>
                  <div className="hero__text hero__text--cover">
                    <span className="hero__kicker">Gallery</span>
                    <h2 className="hero__hdl hero__hdl--cover">
                      Tear gas, flares, clashes and splashes: France's strike in
                      pictures
                    </h2>
                  </div>
                </a>
              </article>
              {/* <div className="grid-element">
                <h2>{store.data.list.name}</h2>
                {store.data.list.items.map((item, index) => {
                  return (
                    <Item key={item.slug + "-" + index} item={item.article} />
                  );
                })}
              </div>
              <div className="grid-element">
                <h2>{this.state.list2.name}</h2>
                {this.state.list2.items.map((item, index) => {
                  return (
                    <Item key={item.slug + "-" + index} item={item.article} />
                  );
                })}
                {this.state.list2.showLoadMore ? (
                  <button
                    style={{ margin: "2em auto", display: "block" }}
                    onClick={this.loadMoreList2}
                    disabled={this.state.list2.loading ? true : false}
                  >
                    load more
                  </button>
                ) : null}
              </div> */}
            </motion.div>
          )}
        </Store.Consumer>
      </>
    );
  }
}

export default Homepage;
