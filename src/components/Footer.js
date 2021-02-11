import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const social = [
  {
    id: 1,
    url: "https://github.com/macadox/dota2-heroes",
    icon: <FaGithub />,
    label: "github",
  },
  {
    id: 2,
    url: "https://www.linkedin.com/in/maciej-okninski/",
    icon: <FaLinkedin />,
    label: "linkedin",
  },
  {
    id: 3,
    url: "mailto:okninski.mac@gmail.com",
    icon: <FaEnvelope />,
    label: "email",
  },
];

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <p className='copyright'>Maciej Okninski &copy; 2021</p>
        <ul className='socials'>
          {social.map((item) => {
            const { id, url, icon, label } = item;
            return (
              <li className='social__item' key={id}>
                <a className='social__link' aria-label={label} href={`${url}`}>
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
