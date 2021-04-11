import React, { useState, useRef, useEffect } from "react";
import AbilityTooltip from "./AbilityTooltip";

import { useGlobalContext } from "../../../contexts/GlobalContext";

const Ability = ({ ability, handlePosition }) => {
  const [show, setShow] = useState(false);
  const abilityRef = useRef(null);
  const tooltipRef = useRef(null);
  const { CDN_URI } = useGlobalContext();

  useEffect(() => {
    const showTooltip = () => {
      setShow(true);
      handlePosition(abilityRef, tooltipRef);
    };

    const hideTooltip = () => {
      setShow(false);
    };

    let cur = abilityRef.current;
    cur.addEventListener("mouseover", showTooltip);
    cur.addEventListener("mouseleave", hideTooltip);
    cur.addEventListener("focusin", showTooltip);
    cur.addEventListener("focusout", hideTooltip);

    return () => {
      if (cur) {
        cur.removeEventListener("mouseover", showTooltip);
        cur.removeEventListener("mouseleave", hideTooltip);
        cur.removeEventListener("focusin", showTooltip);
        cur.removeEventListener("focusout", hideTooltip);
      }
    };
  }, [handlePosition]);

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
