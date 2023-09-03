import { Card } from "../Card/Card";
import "./SearchResults.css";

export const SearchResults = (props) => {
  const { results } = props;

  return (
    <ul className="search-results">
      {results?.map((item, index) => {
        const {
          snippet: { title, thumbnails, channelTitle },
        } = item;

        return (
          <Card
            key={index}
            title={title}
            thumbnail={thumbnails.medium}
            channelTitle={channelTitle}
          />
        );
      })}
    </ul>
  );
};
