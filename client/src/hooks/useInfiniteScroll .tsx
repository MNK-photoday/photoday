import { useContext, useEffect, useRef } from 'react';
import { PageNumContext } from '../context/PageNumContext';

const useInfiniteScroll = (
  loading: boolean,
  hasMore: boolean,
  threshold = 0.5,
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);
  useEffect(() => {
    if (loading || !hasMore) {
      observer.current?.disconnect();
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          PAGE_NUM_CONTEXT?.setPageNumber((prev: number) => prev + 1);
        }
      },
      { threshold },
    );

    observer.current.observe(document.getElementById('endElement')!);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore]);
};

export default useInfiniteScroll;
