import Navigation from "./Navigation";

const Header = () => {
  return (
    <div>
      <header className="head">
        <div className="head__top">
          <nav className="head__topLeft">
            <ul className="links">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Newsletter</a>
              </li>
            </ul>
          </nav>
          <div className="head__topRight">
            <p>Get exclusive content</p>
            <a href="#" className="btn btn--color">
              Subscribe
            </a>
          </div>
        </div>
        <div className="head__middle">
          <a href="#" className="head__logo">
            <img src="img/logo.svg" width="164" alt="" />
          </a>
        </div>
        <div className="head__bottom">
          <Navigation menuName="mainNavigation" />
          <nav>
            <ul className="links links--icon">
              <li>
                <a href="#">
                  <img src="img/icon-search.svg" alt="" /> Search
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="img/icon-login.svg" alt="" /> Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
