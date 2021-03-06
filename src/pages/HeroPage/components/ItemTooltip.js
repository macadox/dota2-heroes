import React from "react";
import joinDescription from "../../../utils/joinDescription";
import { FaCoins } from "react-icons/fa";
import cooldown from "../../../assets/img/cooldown.png";

const ItemTooltip = ({ item, CDN_URI, ...props }, ref) => {
  return (
    <div className='tooltip-wrap' ref={ref} {...props}>
      <div className='tooltip tooltip--item' id={`${item.id}_tooltip`}>
        <div className='tooltip__header'>
          <img
            src={`${CDN_URI}${item.img}`}
            className='tooltip__item-img'
            alt={item.dname}
          />
          <div className='tooltip__header-title'>
            <p className={`item__name ${item.qual ? item.qual : ""}`}>
              {item.dname}
            </p>
            <p className='item__cost'>
              <FaCoins /> {item.cost}
            </p>
          </div>
        </div>
        <div className='tooltip__main'>
          {item.hint ? (
            <div className='item__hints'>
              {item.hint.map((h, i) => [
                <div className='item__hint' key={i}>
                  <p className='item__hint-header'></p>
                  <p className='item__hint-content'>{h}</p>
                </div>,
              ])}
            </div>
          ) : (
            ""
          )}
          {item.notes ? (
            <div className='item__notes'>
              {item.notes.split("\n").map((n, i) => {
                return (
                  <p className='item__note' key={i}>
                    {n}
                  </p>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {item.attrib ? (
            <div className='item__attribs'>
              {item.attrib.map((a, i) => {
                return (
                  <p className='item__attrib' key={i}>
                    <span className='item__attrib-header'>{a.header}</span>
                    <span className='item__attrib-value'>{a.value}</span>{" "}
                    {a.footer && (
                      <span className='item__attrib-footer'>{a.footer}</span>
                    )}
                  </p>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className='tooltip__footer'>
          {item.cd && (
            <div className='item__cd'>
              <img className='item__cd-icon' src={cooldown} alt='cooldown' />
              <span>{joinDescription(item.cd, " / ")}</span>
            </div>
          )}
          {item.mc && (
            <div className='item__mc'>
              <div className='item__mc-icon'></div>
              <span>{joinDescription(item.mc, " / ")}</span>
            </div>
          )}
        </div>
        <div className='item__lore-wrap'>
          <p className='item__lore'>{item.lore}</p>
        </div>
      </div>
    </div>
  );
};

const forwardedRef = React.forwardRef(ItemTooltip);

export default forwardedRef;
