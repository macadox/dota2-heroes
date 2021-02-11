import React from "react";
import cooldown from "../../../assets/img/cooldown.png";
import { joinDescription } from "../../../utils";

const AbilityTooltip = ({ ability, ...props }, ref) => {
  return (
    <div className='tooltip-wrap' ref={ref} {...props}>
      <div className='tooltip tooltip--ability'>
        <div className='tooltip__main'>
          <h4 className='ability__name'>{ability.dname}</h4>
          {ability.behavior && (
            <p className='ability__property'>
              ABILITY: {joinDescription(ability.behavior, ", ")}
            </p>
          )}
          {ability.dmg_type && (
            <p className='ability__property'>
              DAMAGE TYPE:{" "}
              <span
                className={`${
                  ability.dmg_type === "Physical" ? "hl--physical" : "hl--magic"
                }`}
              >
                {ability.dmg_type}
              </span>
            </p>
          )}
          {ability.bkbpierce && (
            <p className='ability__property'>
              PIERCES SPELL IMMUNITY: {ability.bkbpierce}
            </p>
          )}
          {ability.target_type && (
            <p className='ability__property'>
              TARGET TYPE: {ability.target_type}
            </p>
          )}
          <p className='ability__desc'>{ability.desc}</p>
          {ability.attrib.map((a, i) => {
            if (
              a.header === "ABILITYCASTRANGE:" ||
              a.header === "ABILITYCASTPOINT"
            )
              return null;
            else
              return (
                <p className='ability__attr' key={i}>
                  {a.header}{" "}
                  <span>
                    {joinDescription(a.value, " / ")}
                  </span>
                </p>
              );
          })}
          <div className='tooltip__footer'>
            {ability.cd && (
              <div className='ability__cd'>
                <img
                  src={cooldown}
                  alt='cooldown'
                  className='ability__cd-icon'
                />
                <span>
                  {joinDescription(ability.cd, " / ")}
                </span>
              </div>
            )}
            {ability.mc && (
              <div className='ability__mc'>
                <div className='ability__mc-icon'></div>
                <span>
                  {joinDescription(ability.mc, " / ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const forwardedRef = React.forwardRef(AbilityTooltip);

export default forwardedRef;
