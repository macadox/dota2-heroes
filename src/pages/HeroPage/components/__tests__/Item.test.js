// import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppContext, AppProvider } from "../../../../contexts/GlobalContext";
import Item from "../Item";

import items from "./items";
import itemIds from "./itemIds";

describe("ability tooltip component interaction", () => {
  it("should respond to hover and display Item tooltip", () => {
    const handlePosition = jest.fn();
    render(
      <AppContext.Provider>
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
      <AppContext.Provider>
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
