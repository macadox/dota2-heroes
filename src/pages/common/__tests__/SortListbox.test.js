import { screen, render } from "@testing-library/react";
import SortListbox from "../SortListbox";
import userEvent from "@testing-library/user-event";

it("should start with the first option from the list if options are passed", () => {
  render(
    <SortListbox
      options={[
        { label: "Name", value: "localized_name" },
        { label: "ID", value: "id" },
        { label: "Attack range", value: "attack_range" },
        { label: "Move speed", value: "move_speed" },
        { label: "Attack rate", value: "attack_rate" },
        { label: "Turn rate", value: "turn_rate" },
      ]}
    />
  );
  const listboxButton = screen.getByRole("button");
  expect(listboxButton).toHaveTextContent(/name \(asc\)/i);
});

it("should order asc when different key is selected", () => {
  render(
    <SortListbox
      options={[
        { label: "Name", value: "localized_name" },
        { label: "ID", value: "id" },
        { label: "Attack range", value: "attack_range" },
        { label: "Move speed", value: "move_speed" },
        { label: "Attack rate", value: "attack_rate" },
        { label: "Turn rate", value: "turn_rate" },
      ]}
      handleReverse={jest.fn()}
    />
  );
  const listboxButton = screen.getByRole("button", { name: /name/i });
  userEvent.click(listboxButton);
  const attackRangeSort = screen.getByRole("option", { name: /attack range/i });
  userEvent.click(attackRangeSort);

  const newLabelListboxButton = screen.getByRole("button", {
    name: /attack range \(asc\)/i,
  });
  expect(newLabelListboxButton).toBeInTheDocument();
});

it("should order desc when the same key is selected", () => {
  render(
    <SortListbox
      options={[
        { label: "Name", value: "localized_name" },
        { label: "ID", value: "id" },
        { label: "Attack range", value: "attack_range" },
        { label: "Move speed", value: "move_speed" },
        { label: "Attack rate", value: "attack_rate" },
        { label: "Turn rate", value: "turn_rate" },
      ]}
      handleReverse={jest.fn()}
    />
  );
  const listboxButton = screen.getByRole("button", { name: /name/i });
  userEvent.click(listboxButton);
  const attackRangeSort = screen.getByRole("option", { name: /attack range/i });
  userEvent.click(attackRangeSort);

  const newLabelListboxButton = screen.getByRole("button", {
    name: /attack range \(asc\)/i,
  });
  userEvent.click(newLabelListboxButton);
  expect(newLabelListboxButton).toBeInTheDocument();
});
