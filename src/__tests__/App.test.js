import { act, fireEvent, render } from "@testing-library/react";
import { App } from "../App";
import { searchData } from "../common/testData";

const mockedFn = jest.fn();
const observe = mockedFn;
const unobserve = mockedFn;

describe("Tests for the App component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(searchData),
        status: 200,
      });
    });

    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
    }));
  });

  it("should search videos for the given keyword", async () => {
    const { getByRole, getByPlaceholderText, getByText, container } = render(
      <App />
    );

    const searchInput = getByPlaceholderText(/type to search/i);
    const searchButton = getByRole("button", { name: /search/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeDisabled();

    fireEvent.change(searchInput, { target: { value: "JavaScript" } });
    expect(searchInput).toHaveValue("JavaScript");
    expect(searchButton).toBeEnabled();

    await act(async () => fireEvent.click(searchButton));
    expect(fetch).toHaveBeenCalledTimes(1);
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

  it("should show error message if search api call fails for some reason", async () => {
    const fetchError = {
      error: { message: "API key is not valid. Please pass a valid API key." },
    };

    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fetchError),
        status: 400,
      });
    });

    const { getByPlaceholderText, getByText, container } = render(<App />);

    const searchInput = getByPlaceholderText(/type to search/i);

    fireEvent.change(searchInput, { target: { value: "JavaScript" } });
    await act(async () => fireEvent.submit(searchInput));
    expect(container.getElementsByClassName("card")).toHaveLength(0);
    expect(getByText(fetchError.error.message)).toBeInTheDocument();
  });
});
