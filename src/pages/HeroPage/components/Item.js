import React, { useState, useRef, useEffect } from "react";
import ItemTooltip from "./ItemTooltip";

const Item = ({ item, handlePosition, itemIds, items, CDN_URI }) => {
  const { id, img, name, quality } = item;
  const [show, setShow] = useState(false);
  const itemRef = useRef(null);
  const tooltipRef = useRef(null);

  const showTooltip = () => {
    setShow(true);
    handlePosition(itemRef, tooltipRef);
  };

  const hideTooltip = () => {
    setShow(false);
  };

  useEffect(() => {
    const cur = itemRef.current;

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
  }, []);

  return (
    <div
      className={`item item--${quality}`}
      ref={itemRef}
      tabIndex={0}
      aria-describedby={`elem_item_${id}`}
    >
      <img src={`${CDN_URI}${img}`} alt={name} className='item__img' />
      {show && (
        <ItemTooltip
          role='tooltip'
          ref={tooltipRef}
          item={items[itemIds[id]]}
          id={`elem_item_${id}`}
          CDN_URI={CDN_URI}
        />
      )}
    </div>
  );
};

export default Item;
