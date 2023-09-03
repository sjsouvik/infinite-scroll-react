import { useEffect } from "react";

export const useObserver = ({ observer, pageToken, setNextPageToken }) => {
  useEffect(() => {
    const intObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pageToken) {
          setNextPageToken(pageToken);
        }
      },
      { threshold: 0.5 }
    );

    if (observer.current) {
      intObserver.observe(observer.current);
    }

    return () => {
      if (observer.current) {
        intObserver.unobserve(observer.current);
      }
    };
  }, [observer, setNextPageToken, pageToken]);
};
