import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const social = [
  {
    id: 1,
    url: "https://www.twitter.com",
    icon: <FaGithub />,
  },
  {
    id: 2,
    url: "https://www.twitter.com",
    icon: <FaLinkedin />,
  },
  {
    id: 3,
    url: "https://www.twitter.com",
    icon: <FaEnvelope />,
  },
];

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <p className='copyright'>Maciej Okninski &copy; 2021</p>
        <ul className='socials'>
          {social.map((item) => {
            const { id, url, icon } = item;
            return (
              <li className='social__item' key={id}>
                <a className='social__link' href={`${url}`}>
                  {icon}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
