import React, { useState, useRef, useEffect } from "react";
import AbilityTooltip from "./AbilityTooltip";
import { handlePosition } from "../../utils";

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

    return () => {
      if (abilityRef.current) {
        abilityRef.current.removeEventListener("mouseover", showTooltip);
        abilityRef.current.removeEventListener("mouseleave", hideTooltip);
      }
    };
  }, []);

  return (
    <div className='hero__ability' ref={abilityRef}>
      <img
        src={`${CDN_URI}${ability.img}`}
        alt={ability.dname}
        className='hero__ability-img'
      />
      {show && <AbilityTooltip ref={tooltipRef} ability={ability} />}
    </div>
  );
};

export default Ability;
