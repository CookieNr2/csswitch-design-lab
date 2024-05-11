import "./footer.css";

function Footer() {
  return (
    <div className="footer fixed-bottom border-top">
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-2 my-3">
        <span className="mb-3 mb-md-0 text-light fw-normal">
          Oksana Klochak
        </span>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="link-light"
              href="https://github.com/CookieNr2"
              target="_blank"
            >
              <i className="h4 bi bi-github"></i>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="link-light"
              href="https://www.linkedin.com/in/oklochak/"
              target="_blank"
            >
              <i className="h4 bi bi-linkedin"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
