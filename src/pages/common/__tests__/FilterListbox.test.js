import { screen, render } from "@testing-library/react";
import FilterListbox from "../FilterListbox";
import userEvent from "@testing-library/user-event";

describe("FilterListbox workflow", () => {
  it("should display filters if they are selected", () => {
    render(
      <FilterListbox
        options={[
          { label: "Agility", value: "agi" },
          { label: "Strength", value: "str" },
          { label: "Intelligence", value: "int" },
        ]}
        filter={["agi", "str", "int"]}
      />
    );

    const listboxButton = screen.getByRole("button");
    expect(listboxButton).toHaveTextContent("Agility, Strength, Intelligence");
  });

  it("should display defaultValue if no filters are selected", () => {
    render(
      <FilterListbox
        defaultText='Roles'
        options={[
          { label: "Carry", value: "Carry" },
          { label: "Disabler", value: "Disabler" },
          { label: "Durable", value: "Durable" },
          { label: "Escape", value: "Escape" },
          { label: "Initiator", value: "Initiator" },
          { label: "Jungler", value: "Jungler" },
          { label: "Nuker", value: "Nuker" },
          { label: "Pusher", value: "Pusher" },
          { label: "Support", value: "Support" },
        ]}
        filter={[]}
      />
    );

    const listboxButton = screen.getByRole("button");
    expect(listboxButton).toHaveTextContent("Roles");
  });

  it("should open the listbox items list, when the listbox button is clicked", () => {
    const options = [
      { label: "Agility", value: "agi" },
      { label: "Strength", value: "str" },
      { label: "Intelligence", value: "int" },
    ];

    render(<FilterListbox options={options} filter={["agi", "str", "int"]} />);

    const listboxButton = screen.getByRole("button");
    userEvent.click(listboxButton);

    const list = screen.getByRole("listbox");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("option");
    listItems.forEach((el, idx) =>
      expect(el).toHaveTextContent(options[idx].label)
    );
  });

  it("should close the listbox items list on click outside and on cick on listbox button", () => {
    render(
      <FilterListbox
        options={[
          { label: "Agility", value: "agi" },
          { label: "Strength", value: "str" },
          { label: "Intelligence", value: "int" },
        ]}
        filter={["agi", "str", "int"]}
      />
    );

    const listboxButton = screen.getByRole("button");
    userEvent.click(listboxButton);

    // Show ul
    const list = screen.getByRole("listbox");
    expect(list).toBeInTheDocument();

    // Hide ul with button click
    userEvent.click(listboxButton);
    const hiddenList = screen.queryByRole("listbox");
    expect(hiddenList).not.toBeInTheDocument();

    // Show ul
    userEvent.click(listboxButton);
    const listAgain = screen.getByRole("listbox");
    expect(listAgain).toBeInTheDocument();

    // Hide ul with click outside
    userEvent.click(document.body);
    const hiddenListAgain = screen.queryByRole("listbox");
    expect(hiddenListAgain).not.toBeInTheDocument();
  });

  it("should change the content when the items are added to the filter list", () => {
    render(
      <FilterListbox
        defaultText='Roles'
        options={[
          { label: "Carry", value: "Carry" },
          { label: "Disabler", value: "Disabler" },
          { label: "Durable", value: "Durable" },
          { label: "Escape", value: "Escape" },
          { label: "Initiator", value: "Initiator" },
          { label: "Jungler", value: "Jungler" },
          { label: "Nuker", value: "Nuker" },
          { label: "Pusher", value: "Pusher" },
          { label: "Support", value: "Support" },
        ]}
        filter={[]}
      />
    );

    const listboxButton = screen.getByRole("button");

    userEvent.click(listboxButton);

    const disablerOption = screen.getByRole("option", { name: /disabler/i });
    const escapeOption = screen.getByRole("option", { name: /escape/i });
    const initiatorOption = screen.getByRole("option", { name: /initiator/i });

    userEvent.click(disablerOption);
    userEvent.click(escapeOption);
    userEvent.click(initiatorOption);
    expect(listboxButton).toHaveTextContent("Disabler, Escape, Initiator");
    userEvent.click(initiatorOption);
    expect(listboxButton).toHaveTextContent("Disabler, Escape");
  });

  it("should fire a callback whenever listbox values are changed", () => {
    const mockFilter = jest.fn();

    render(
      <FilterListbox
        options={[
          { label: "Agility", value: "agi" },
          { label: "Strength", value: "str" },
          { label: "Intelligence", value: "int" },
        ]}
        filter={["agi", "str", "int"]}
        filterBy={mockFilter}
      />
    );

    const listboxButton = screen.getByRole("button");
    userEvent.click(listboxButton);

    const agilityOption = screen.getByRole("option", { name: /agility/i });
    userEvent.click(agilityOption);

    expect(mockFilter).toHaveBeenCalled();
  });
});
