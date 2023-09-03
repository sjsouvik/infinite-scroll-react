import { fireEvent, render } from "@testing-library/react";
import { SearchInput } from "../components";

const mockedFn = jest.fn();
const setSearchText = mockedFn;
const searchHandler = mockedFn;

describe("Tests for the SearchInput component", () => {
  it("should render the component, update the value of the input element on type, and invoke the search handler on click of the search button", () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchInput
        searchText=""
        setSearchText={setSearchText}
        searchHandler={searchHandler}
      />
    );

    const searchInput = getByPlaceholderText(/type to search/i);
    const searchButton = getByRole("button", { name: /search/i });

    expect(searchInput).toHaveValue("");
    fireEvent.change(searchInput, { target: { value: "JavaScript" } });
    expect(setSearchText).toHaveBeenCalledWith("JavaScript");

    fireEvent.click(searchButton);
    expect(searchHandler).toHaveBeenCalled();
  });
});
