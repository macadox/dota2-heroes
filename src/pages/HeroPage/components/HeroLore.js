import React from "react";

const HeroLore = ({ heroLore, hero }) => {
  const regex = new RegExp(/(?<=npc_dota_hero_)\w+/, "");
  const heroAlias = hero.name.match(regex)[0];
  const lore = heroLore[heroAlias];
  const [part1, part2] = lore
    .split(" ")
    .reduce((reducer, word, index) => {
      if (reducer.length === 0) return [[word], []];
      if (index <= 100) {
        reducer[0] = reducer[0].concat(word);
      } else {
        reducer[1] = reducer[1].concat(word);
      }

      return reducer;
    }, [])
    .map((item) => item.join(" "));

  return (
    <div className='lore'>
      <p className='lore__content'>
        {part1}
        <span className='lore__dots'>...</span>
        <span className='lore__more'>{part2}</span>
      </p>
      <button className='lore__show-more btn--alt'>Show More</button>
    </div>
  );
};

export default HeroLore;
