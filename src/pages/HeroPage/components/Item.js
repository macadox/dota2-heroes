import React, { useState, useRef, useEffect } from "react";
import ItemTooltip from "./ItemTooltip";

import { handlePosition } from "../../../utils";
import { useGlobalContext } from "../../../context";

const Item = ({ item }) => {
  const { id, img, name, quality } = item;
  const [show, setShow] = useState(false);
  const itemRef = useRef(null);
  const tooltipRef = useRef(null);
  const { CDN_URI, items, itemIds } = useGlobalContext();

  const showTooltip = () => {
    setShow(true);
    handlePosition(itemRef, tooltipRef);
  };

  const hideTooltip = () => {
    setTimeout(() => setShow(false), 200);
  };

  useEffect(() => {
    itemRef.current.addEventListener("mouseover", showTooltip);
    itemRef.current.addEventListener("mouseleave", hideTooltip);

    return () => {
      if (itemRef.current) {
        itemRef.current.removeEventListener("mouseover", showTooltip);
        itemRef.current.removeEventListener("mouseleave", hideTooltip);
      }
    };
  }, []);

  return (
    <div className={`item item--${quality}`} ref={itemRef}>
      <img src={`${CDN_URI}${img}`} alt={name} className='item__img' />
      {show && <ItemTooltip ref={tooltipRef} item={items[itemIds[id]]} />}
    </div>
  );
};

export default Item;
