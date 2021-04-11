import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { AppProvider } from "../contexts/GlobalContext";

describe("filtering hero list workflow", () => {
  it("should properly render SearchBar, SortListbox", async () => {
    render(<App />, { wrapper: AppProvider });

    const searchBar = await screen.findByLabelText(/search for hero/i);
    expect(searchBar).toBeInTheDocument();

    const listboxButton = screen.getByRole("button", { name: /name/i });
    userEvent.click(listboxButton);

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
  });

  it("should have filter panel hidden by default", () => {
    render(<App />, { wrapper: AppProvider });

    const toggleFilters = screen.getByRole("button", { name: /show filters/i });
    expect(toggleFilters).toBeInTheDocument();

    const attributeFilterButton = screen.queryByRole("button", {
      name: /agility, strength, intelligence/i,
    });
    expect(attributeFilterButton).not.toBeInTheDocument();
    const rangedFilterButton = screen.queryByRole("button", {
      name: /melee, ranged/i,
    });
    expect(rangedFilterButton).not.toBeInTheDocument();
    const rolesFilterButton = screen.queryByRole("button", {
      name: /roles/i,
    });
    expect(rolesFilterButton).not.toBeInTheDocument();
  });

  it("should toggle the panel when its clicked", () => {
    render(<App />, { wrapper: AppProvider });

    const toggleFilters = screen.getByRole("button", { name: /show filters/i });
    userEvent.click(toggleFilters);

    expect(toggleFilters).toHaveTextContent(/hide filters/i);

    const attributeFilterButton = screen.getByRole("button", {
      name: /agility, strength, intelligence/i,
    });
    expect(attributeFilterButton).toBeInTheDocument();
    const rangedFilterButton = screen.getByRole("button", {
      name: /melee, ranged/i,
    });
    expect(rangedFilterButton).toBeInTheDocument();
    const rolesFilterButton = screen.getByRole("button", {
      name: /roles/i,
    });
    expect(rolesFilterButton).toBeInTheDocument();
  });

  it("should call an api and display list of all heroes by default", async () => {
    render(<App />, { wrapper: AppProvider });

    const list = await screen.findByRole("list", { name: /heroes list/i });
    expect(list.children).toHaveLength(19);
  });

  it("should react to filter changing", async () => {
    render(<App />, { wrapper: AppProvider });

    const toggleFilters = await screen.findByRole("button", {
      name: /show filters/i,
    });
    userEvent.click(toggleFilters);

    const rolesFilterButton = screen.getByRole("button", {
      name: /roles/i,
    });
    userEvent.click(rolesFilterButton);

    // Check Roles
    const disablerOption = screen.getByRole("option", { name: /disabler/i });
    const escapeOption = screen.getByRole("option", { name: /escape/i });
    const initiatorOption = screen.getByRole("option", { name: /initiator/i });

    userEvent.click(disablerOption);
    userEvent.click(escapeOption);
    userEvent.click(initiatorOption);

    const list = await screen.findByRole("list", { name: /heroes list/i });
    expect(list.children).toHaveLength(3);

    // Unselect Strength Attr
    const attributesFilterButton = screen.getByRole("button", {
      name: /agility, strength, intelligence/i,
    });
    userEvent.click(attributesFilterButton);

    const strengthOption = screen.getByRole("option", {
      name: /strength/i,
    });
    userEvent.click(strengthOption);
    expect(list.children).toHaveLength(2);

    // Unselect melee range
    const rangeFilterButton = screen.getByRole("button", {
      name: /melee, ranged/i,
    });
    userEvent.click(rangeFilterButton);
    const rangedOption = screen.getByRole("option", { name: /ranged/i });
    userEvent.click(rangedOption);

    const noHeroesSpan = screen.getByText(
      "There are no heroes matching that criteria..."
    );
    expect(noHeroesSpan).toBeInTheDocument();

    // Click on reset filters button
    const resetFilterButton = screen.getByRole("button", {
      name: /reset filters/i,
    });
    userEvent.click(resetFilterButton);
    expect(list.children).toHaveLength(19);

    // Try search by text
    const search = screen.getByLabelText("Search for hero");
    userEvent.type(search, "anti");
    expect(list.children).toHaveLength(1);

    expect(attributesFilterButton).toHaveTextContent(
      /agility, strength, intelligence/i
    );
  });
});
