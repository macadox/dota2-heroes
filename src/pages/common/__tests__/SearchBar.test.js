import { screen, render } from "@testing-library/react";
import SearchBar from "../SearchBar";
import userEvent from "@testing-library/user-event";

describe("SearchBar workflow", () => {
  it("should have an input that is empty by default", () => {
    render(<SearchBar filterByName={jest.fn()} />);

    const input = screen.getByLabelText(/search for hero/i);
    expect(input.value).toBeFalsy();
  });

  it("should have an input that saves text in its state", () => {
    render(<SearchBar filterByName={jest.fn()} />);

    const input = screen.getByLabelText(/search for hero/i);
    userEvent.type(input, "Alchemist");

    expect(input.value).toBe("Alchemist");

    userEvent.clear(input);
    expect(input.value).toBeFalsy();
  });

  it("should run a callback function on input change", () => {
    const mockFilterByName = jest.fn();
    render(<SearchBar filterByName={mockFilterByName} />);

    const input = screen.getByLabelText(/search for hero/i);
    userEvent.type(input, "Alchemist");
    expect(mockFilterByName).toHaveBeenCalledTimes("Alchemist".length + 1);
  });
});
