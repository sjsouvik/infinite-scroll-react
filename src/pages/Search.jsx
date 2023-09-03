import { useEffect, useRef, useState } from "react";
import { SearchInput, SearchResults, Loader } from "../components";
import { useApi, useObserver } from "../hooks";

export const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const observer = useRef(null);

  const { makeApiCall, loading, error, searchResponse } = useApi();
  useObserver({
    observer,
    pageToken: searchResponse?.nextPageToken,
    setNextPageToken,
  });

  const loadMoreVideos = async () => {
    const result = await makeApiCall(searchText, nextPageToken);
    setSearchResults((results) => [...results, ...result.items]);
  };

  useEffect(() => {
    if (nextPageToken) {
      loadMoreVideos();
    }
  }, [nextPageToken]);

  const searchHandler = async () => {
    if (searchText) {
      const result = await makeApiCall(searchText, "");
      setSearchResults(result?.items);
      setNextPageToken("");
    }
  };

  return (
    <>
      <h1 className="text-center">Search Videos</h1>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        searchHandler={searchHandler}
      />
      <section>
        <SearchResults results={searchResults} />

        {loading && <Loader />}
        {error && <p className="text-center">{error}</p>}
        <div ref={observer}></div>
      </section>
    </>
  );
};
