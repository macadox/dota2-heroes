import React from "react";
import {
  FaKhanda,
  FaShieldAlt,
  FaRunning,
  FaHandPaper,
  FaMagic,
  FaSyncAlt,
  FaSlidersH,
  FaLongArrowAltRight,
} from "react-icons/fa";

import agiMin from "../../../assets/img/agi-min.jpg";
import intMin from "../../../assets/img/int-min.jpg";
import strMin from "../../../assets/img/str-min.jpg";

const HeroStats = ({ hero }) => {
  return (
    <div className='hero__stats'>
      <div className='stats stats--main'>
        <div className='stat agi'>
          <img src={agiMin} alt='agility' />
          <div className='stat__values'>
            <span className='stat__value'>{hero.base_agi}</span>
            <span className='stat__gain'>+{hero.agi_gain}</span>
          </div>
        </div>
        <div className='stat int'>
          <img src={intMin} alt='intelligence' />
          <div className='stat__values'>
            <span className='stat__value'>{hero.base_int}</span>
            <span className='stat__gain'>+{hero.int_gain}</span>
          </div>
        </div>
        <div className='stat str'>
          <img src={strMin} alt='strength' />
          <div className='stat__values'>
            <span className='stat__value'>{hero.base_str}</span>
            <span className='stat__gain'>+{hero.str_gain}</span>
          </div>
        </div>
      </div>
      <div className='stats stats--sec'>
        <table>
          <tbody>
            <tr>
              <th>Attack</th>
              <td>
                <FaKhanda />
                <span>
                  {hero.base_attack_min} - {hero.base_attack_max}
                </span>
              </td>
              <td>
                <FaHandPaper />
                <span>{hero.attack_rate}</span>
              </td>
              <td>
                <FaSlidersH />
                <span>{hero.attack_range}</span>
              </td>
              <td>
                <FaLongArrowAltRight />
                <span>{hero.projectile_speed}</span>
              </td>
            </tr>
            <tr>
              <th>Defense</th>
              <td colSpan={3}>
                <FaShieldAlt />
                <span>{hero.base_armor}</span>
              </td>
              <td>
                <FaMagic />
                <span>{hero.base_mr}</span>
              </td>
            </tr>
            <tr>
              <th>Mobility</th>
              <td colSpan={3}>
                <FaRunning />
                <span>{hero.move_speed}</span>
              </td>
              <td>
                <FaSyncAlt />
                <span>{hero.turn_rate}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeroStats;
