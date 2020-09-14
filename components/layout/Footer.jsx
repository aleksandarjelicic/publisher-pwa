const Footer = () => {
  return (
    <footer className="footer">
      <a href="#" className="footer__logo">
        <img src="img/logo-white.svg" alt="" />
      </a>
      <div className="footer__social">
        <p>Follow us</p>
        <ul className="links links--icon">
          <li>
            <a href="#" target="_BLANK">
              <img src="img/social-fb.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#" target="_BLANK">
              <img src="img/social-tw.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#" target="_BLANK">
              <img src="img/social-yt.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="#" target="_BLANK">
              <img src="img/social-rss.svg" alt="" />
            </a>
          </li>
        </ul>
      </div>
      <p>
        © 2020 Sourcefabric <br />
        All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
