import React from "react";
import agiIcon from "../../../assets/img/agi-big.jpg";
import intIcon from "../../../assets/img/int-big.jpg";
import strIcon from "../../../assets/img/str-big.jpg";

import { useGlobalContext } from "../../../context";

const HeroHeader = ({ hero }) => {
  const { CDN_URI } = useGlobalContext();

  return (
    <div className='hero__header'>
      <div className='hero__img-container'>
        <img
          src={`${CDN_URI}${hero.img}`}
          alt={hero.localized_name}
          className='hero__portrait'
        />
        <img
          src={
            hero.primary_attr === "agi"
              ? agiIcon
              : hero.primary_attr === "str"
              ? strIcon
              : intIcon
          }
          alt={hero.primary_attr}
          className='hero__attribute'
        />
      </div>
      <h2 className='hero__name'>{hero.localized_name}</h2>
      <p className='hero__roles'>
        {[hero.attack_type, ...hero.roles].join(", ")}
      </p>
    </div>
  );
};

export default HeroHeader;
