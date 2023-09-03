import { render } from "@testing-library/react";
import { Card } from "../components/Card/Card";

describe("Tests for the card component", () => {
  it("should render a card with all given details", () => {
    const { getByText, getByRole } = render(
      <Card
        title="Title of the card"
        thumbnail={{ url: "https:/url-of-the-img.jpg" }}
        channelTitle="Channel's title"
      />
    );

    expect(getByText(/title of the card/i)).toBeInTheDocument();
    expect(getByText(/channel's title/i)).toBeInTheDocument();
    expect(getByRole("img")).toHaveAttribute(
      "src",
      "https:/url-of-the-img.jpg"
    );
  });
});
