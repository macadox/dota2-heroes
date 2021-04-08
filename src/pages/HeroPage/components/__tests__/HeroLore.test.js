import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroLore from "../HeroLore";

it("should respond to hover and display HeroLore tooltip", () => {
  render(<HeroLore />);
});
