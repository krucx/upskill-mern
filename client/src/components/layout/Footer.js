import React from "react";

const Footer = () => {
  return (
    <div className="footer-copyright text-center py-3 container pt-4 navbar-fixed-bottom">
      <hr className="divider divider-fade divider-dark my-3" />© 2021 All
      copyrights Reserved by Upskill
      <a
        className="m-2"
        href=""
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-linkedin" />
      </a>
      <a
        className="m-2"
        href=""
        target="_blank"
        rel="noopener noreferrer"
      >
      
       
        <i className="fab fa-facebook" />
      </a>
      <a
        className="m-2"
        href=""
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-instagram" />
      </a>
      <a
        className="m-2"
        href=""
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter" />
      </a>
    </div>
  );
};

export default Footer;
