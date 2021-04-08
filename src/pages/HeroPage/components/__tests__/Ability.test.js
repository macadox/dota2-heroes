import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ability from "../Ability";
import { AppProvider } from "../../../../contexts/GlobalContext";

const ability = {
  dname: "Mana Void",
  behavior: ["Unit Target", "AOE"],
  dmg_type: "Magical",
  bkbpierce: "No",
  desc:
    "For each point of mana missing by the target unit, damage is dealt to it and surrounding enemies.  The main target is also mini-stunned.",
  attrib: [
    {
      key: "mana_void_damage_per_mana",
      header: "DAMAGE:",
      value: ["0.8", "0.95", "1.1"],
    },
    {
      key: "mana_void_ministun",
      header: "STUN DURATION:",
      value: "0.3",
    },
    {
      key: "mana_void_aoe_radius",
      header: "RADIUS:",
      value: "500",
    },
    {
      key: "scepter_cooldown_increase",
      header: "SCEPTER COOLDOWN INCREASE:",
      value: "100",
    },
    {
      key: "scepter_ministun",
      header: "SCEPTER STUN DURATION:",
      value: "1.3",
    },
    {
      key: "abilitycastrange",
      header: "ABILITYCASTRANGE:",
      value: "600",
      generated: true,
    },
    {
      key: "abilitycastpoint",
      header: "ABILITYCASTPOINT:",
      value: "0.3",
      generated: true,
    },
  ],
  mc: ["125", "200", "275"],
  cd: "70",
  img: "/apps/dota2/images/abilities/antimage_mana_void_md.png",
};

describe("ability tooltip component interaction", () => {
  it("should respond to hover and display ability tooltip", () => {
    const handlePosition = jest.fn();
    render(<Ability ability={ability} handlePosition={handlePosition} />, {
      wrapper: AppProvider,
    });

    //   There should be no ability Tooltip
    const nullAbilityTooltip = screen.queryByRole("tooltip");
    expect(nullAbilityTooltip).not.toBeInTheDocument();

    //   Hover ability img
    const abilityImg = screen.getByAltText("Mana Void");
    userEvent.hover(abilityImg);
    const abilityTooltip = screen.getByRole("tooltip");
    expect(abilityTooltip).toBeInTheDocument();

    //   Unhover ability img
    userEvent.unhover(abilityImg);
    expect(abilityTooltip).not.toBeInTheDocument();
  });

  it("should responde to focus and display ability tooltip", () => {
    const handlePosition = jest.fn();
    render(<Ability ability={ability} handlePosition={handlePosition} />, {
      wrapper: AppProvider,
    });

    //   There should be no ability Tooltip
    const nullAbilityTooltip = screen.queryByRole("tooltip");
    expect(nullAbilityTooltip).not.toBeInTheDocument();

    //   Focus ability img
    const abilityImg = screen.getByAltText("Mana Void");
    userEvent.tab();
    expect(abilityImg.parentElement).toHaveFocus();

    const abilityTooltip = screen.getByRole("tooltip");
    expect(abilityTooltip).toBeInTheDocument();
  });
});
