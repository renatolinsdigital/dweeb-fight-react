import React from "react";

function Footer() {
  return (
    <React.Fragment>
      <footer className="footer-box">
        <small>
          © Copyright 2019 by{" "}
          <a
            href="https://github.com/renatolinsdigital"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Renato Lins
          </a>
          - All Rights Reserved.
        </small>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
