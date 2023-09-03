import { render } from "@testing-library/react";
import { SearchResults } from "../components";
import { searchData } from "../common/testData";

describe("Tests for the SearchResults component", () => {
  it("should render the video card with all details for each search result item", () => {
    const { container, getByText, getByRole } = render(
      <SearchResults results={searchData.items} />
    );

    expect(container.getElementsByClassName("card")).toHaveLength(1);
    expect(
      getByText(/JavaScript Tutorials for Beginners in Hindi/i)
    ).toBeInTheDocument();
    expect(getByText(/CodeWithHarry/i)).toBeInTheDocument();
    expect(getByRole("img")).toHaveAttribute(
      "src",
      "https://i.ytimg.com/vi/ER9SspLe4Hg/mqdefault.jpg"
    );
  });
});
