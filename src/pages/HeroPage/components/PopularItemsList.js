import React, { useState, useEffect } from "react";

import { useGlobalContext } from "../../../context";

const PopularItemsList = ({ itemPopularity, items, itemIds }) => {
  const { CDN_URI } = useGlobalContext();
  const [results, setResults] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const tempResults = {};

    Object.entries(itemPopularity).forEach((stage) => {
      const [key, val] = stage;
      tempResults[key] = [];
      Object.entries(val).forEach((item) => {
        const itemName = itemIds[item[0]];
        const itemObj = {
          id: item[0],
          popularity: item[1],
          name: items[itemName].dname,
          img: items[itemName].img,
          quality: items[itemName].qual,
        };
        tempResults[key].push(itemObj);
      });
      tempResults[key]
        .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))
        .splice(6);
    });
    const ordered = [
      tempResults.start_game_items,
      tempResults.early_game_items,
      tempResults.mid_game_items,
      tempResults.late_game_items,
    ];
    setResults(ordered);
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <div className='hero__items-inner'>
      {results.map((stage, index) => {
        return (
          <div className='stage' key={index}>
            <h4 className='stage__label'>
              {index === 0
                ? "Start"
                : index === 1
                ? "Early game"
                : index === 2
                ? "Mid game"
                : "Late game"}
            </h4>
            <div className='stage__items'>
              {stage.map((item) => {
                const { id, img, name, quality } = item;
                return (
                  <div className={`item item--${quality}`} key={id}>
                    <img
                      src={`${CDN_URI}${img}`}
                      alt={name}
                      className='item__img'
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularItemsList;
