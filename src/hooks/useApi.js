import { useState } from "react";
import { searchApi } from "../common/constants";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResponse, setSearchResponse] = useState(null);

  const makeApiCall = async (keyword, pageToken) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${searchApi}&q=${keyword}&pageToken=${pageToken}`
      );
      const result = await response.json();

      if (response?.status !== 200) {
        throw new Error(result?.error?.message);
      }

      setSearchResponse(result);
      return result;
    } catch (error) {
      setError(
        error?.message || "Oops! Something went wrong, please try later."
      );
    } finally {
      setLoading(false);
    }
  };

  return { makeApiCall, loading, error, searchResponse };
};
