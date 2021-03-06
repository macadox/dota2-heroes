import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../contexts/GlobalContext";

import agiIcon from "../../../assets/img/agi-min.jpg";
import intIcon from "../../../assets/img/int-min.jpg";
import strIcon from "../../../assets/img/str-min.jpg";

const Hero = ({ hero, tabIndex, ...props }) => {
  const { localized_name, img, primary_attr, id } = hero;
  const { CDN_URI } = useGlobalContext();
  const icon =
    primary_attr === "agi"
      ? agiIcon
      : primary_attr === "int"
      ? intIcon
      : strIcon;

  return (
    <li className='card' {...props}>
      <Link
        tabIndex={tabIndex}
        to={`/hero/${id}`}
        style={{ textDecoration: "none" }}
        className='card__url'
      >
        <img
          src={icon}
          alt={primary_attr}
          className='card__attr'
          loading='lazy'
        />
        <img
          src={`${CDN_URI}${img}`}
          alt={localized_name}
          className='card__portrait'
          loading='lazy'
        />
        <p className='card__title'>{localized_name}</p>
      </Link>
    </li>
  );
};

export default Hero;
