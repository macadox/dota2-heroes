import React, { useState, useRef, useEffect } from "react";
import AbilityTooltip from "./AbilityTooltip";
import { handlePosition } from "../../../utils";

import { useGlobalContext } from "../../../context";

const Ability = ({ ability }) => {
  const [show, setShow] = useState(false);
  const abilityRef = useRef(null);
  const tooltipRef = useRef(null);
  const { CDN_URI } = useGlobalContext();
  const showTooltip = () => {
    setShow(true);
    handlePosition(abilityRef, tooltipRef);
  };

  const hideTooltip = () => {
    setTimeout(() => setShow(false), 200);
  };

  useEffect(() => {
    abilityRef.current.addEventListener("mouseover", showTooltip);
    abilityRef.current.addEventListener("mouseleave", hideTooltip);
    abilityRef.current.addEventListener("focusin", showTooltip);
    abilityRef.current.addEventListener("focusout", hideTooltip);

    return () => {
      if (abilityRef.current) {
        abilityRef.current.removeEventListener("mouseover", showTooltip);
        abilityRef.current.removeEventListener("mouseleave", hideTooltip);
        abilityRef.current.removeEventListener("focusin", showTooltip);
        abilityRef.current.removeEventListener("focusout", hideTooltip);
      }
    };
  }, []);

  return (
    <div
      className='hero__ability'
      aria-describedby={`elem_ability_${ability.dname}`}
      ref={abilityRef}
      tabIndex={0}
    >
      <img
        src={`${CDN_URI}${ability.img}`}
        alt={ability.dname}
        className='hero__ability-img'
      />
      {show && (
        <AbilityTooltip
          role='tooltip'
          ref={tooltipRef}
          id={`elem_ability_${ability.dname}`}
          ability={ability}
        />
      )}
    </div>
  );
};

export default Ability;
