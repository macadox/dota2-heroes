// import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppContext } from "../../../../contexts/GlobalContext";
import Item from "../Item";

const items = {
  abyssal_blade: {
    hint: [
      "Active: Overwhelm Blinks to and stuns a target enemy unit for 2 seconds. Pierces Spell Immunity.Range: 550",
      "Passive: Bash Grants melee heroes a 25% chance on hit to stun the target for 1.5 seconds and deal 100 bonus physical damage.  Bash chance for ranged heroes is 10%.",
      "Passive: Damage Block Grants a 50% chance to block 70 damage from incoming attacks on melee heroes, and 35 damage on ranged.",
    ],
    id: 208,
    img: "/apps/dota2/images/items/abyssal_blade_lg.png?t=1593393829403",
    dname: "Abyssal Blade",
    qual: "epic",
    cost: 6625,
    notes:
      "The stun is melee range.\nDoes not stack with other bashes.\nMultiple sources of damage block do not stack.",
    attrib: [
      {
        key: "bonus_damage",
        header: "+",
        value: "25",
        footer: "Damage",
      },
      {
        key: "bonus_health",
        header: "+",
        value: "250",
        footer: "Health",
      },
      {
        key: "bonus_health_regen",
        header: "+",
        value: "10",
        footer: "HP Regeneration",
      },
      {
        key: "bonus_strength",
        header: "+",
        value: "10",
        footer: "Strength",
      },
    ],
    mc: 75,
    cd: 35,
    lore:
      "The lost blade of the Commander of the Abyss, this edge cuts into an enemy's soul.",
    components: ["basher", "vanguard"],
    created: true,
    charges: false,
  },
};

const itemIds = {
  208: "abyssal_blade",
};

describe("ability tooltip component interaction", () => {
  it("should respond to hover and display Item tooltip", () => {
    const handlePosition = jest.fn();
    render(
      <AppContext.Provider value={{}}>
        <Item
          item={{
            id: "208",
            popularity: 47,
            name: "Abyssal Blade",
            img:
              "/apps/dota2/images/items/abyssal_blade_lg.png?t=1593393829403",
            quality: "epic",
          }}
          CDN_URI={`https://cdn.dota2.com`}
          items={items}
          itemIds={itemIds}
          handlePosition={handlePosition}
        />
      </AppContext.Provider>
    );

    //   There should be no ability Tooltip
    const nullItemTooltip = screen.queryByRole("tooltip");
    expect(nullItemTooltip).not.toBeInTheDocument();

    //   Hover ability img
    const itemImg = screen.getByAltText("Abyssal Blade");
    userEvent.hover(itemImg);
    const itemTooltip = screen.getByRole("tooltip");
    expect(itemTooltip).toBeInTheDocument();

    //   Unhover ability img
    userEvent.unhover(itemImg);
    expect(itemTooltip).not.toBeInTheDocument();
  });

  it("should responde to focus and display ability tooltip", () => {
    const handlePosition = jest.fn();
    render(
      <AppContext.Provider value={{}}>
        <Item
          item={{
            id: "208",
            popularity: 47,
            name: "Abyssal Blade",
            img:
              "/apps/dota2/images/items/abyssal_blade_lg.png?t=1593393829403",
            quality: "epic",
          }}
          CDN_URI={`https://cdn.dota2.com`}
          items={items}
          itemIds={itemIds}
          handlePosition={handlePosition}
        />
      </AppContext.Provider>
    );

    //   There should be no ability Tooltip
    const nullItemTooltip = screen.queryByRole("tooltip");
    expect(nullItemTooltip).not.toBeInTheDocument();

    //   Focus ability img
    const itemImg = screen.getByAltText("Abyssal Blade");
    userEvent.tab();
    expect(itemImg.parentElement).toHaveFocus();

    const itemTooltip = screen.getByRole("tooltip");
    expect(itemTooltip).toBeInTheDocument();
  });
});
