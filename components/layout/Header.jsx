import Navigation from "./Navigation";
import Link from "next/link";

const Header = () => {
  // TODO!!!!
  const isLoggedIn = false;

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
          <Link href="/">
            <a className="head__logo">
              <img src="/img/logo.svg" width="164" alt="" />
            </a>
          </Link>
        </div>
        <div className="head__bottom">
          <Navigation menuName="mainNavigation" />
          <nav>
            <ul className="links links--icon">
              <li>
                <a href="#">
                  <img src="/img/icon-search.svg" alt="" />
                  <span>Search</span>
                </a>
              </li>
              <li>
                {isLoggedIn ? (
                  <Link href="/logout">
                    <a>
                      <img src="/img/icon-login.svg" alt="" />
                      <span>Logout</span>
                    </a>
                  </Link>
                ) : (
                  <Link href="/login">
                    <a>
                      <img src="/img/icon-login.svg" alt="" />
                      <span>Login</span>
                    </a>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
