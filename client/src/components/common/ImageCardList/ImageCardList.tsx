import { useContext, useEffect, useRef, useState } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import {
  S_ImageCardBox,
  S_ImageCardWrap,
  S_LoaderBar,
} from './ImageCardList.styles';
import { postSearchTags } from '../../../api/Search';
import { ItemContext } from '../../../context/ItemContext';
import { LoadingContext } from '../../../context/LoadintContext';
import { SearchContext } from '../../../context/SearchContext';
import { PageNumContext } from '../../../context/PageNumContext';
import ImageCardSkeleton from '../Skeleton/ImageCardSkeleton';

export type ImageCardListProps = {
  width: number;
  height?: number;
  matrix?: 'columns' | 'rows';
};

export type ImageItemProps = {
  imageId: number;
  mageUrl: string;
  like: boolean;
  bookmark: false;
};

function ImageCardList({
  width,
  height,
  matrix = 'columns',
}: ImageCardListProps) {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver>();
  const endRef = useRef<HTMLDivElement>(null);

  const ITEM_CONTEXT = useContext(ItemContext);
  const LOADING_CONTEXT = useContext(LoadingContext);
  const SEARCH_CONTEXT = useContext(SearchContext);
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);

  useEffect(() => {
    if (SEARCH_CONTEXT?.searchWord.length !== 0) {
      fetchData();
    }
  }, [SEARCH_CONTEXT?.searchWord, PAGE_NUM_CONTEXT?.pageNumber]);

  useEffect(() => {
    if (LOADING_CONTEXT?.isLoading) {
      observer.current?.disconnect();
      return;
    }
    if (observer.current) {
      observer.current?.disconnect();
    }
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          PAGE_NUM_CONTEXT?.setPageNumber((prev: number) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    if (endRef.current !== null) {
      observer.current.observe(endRef.current);
    }
  }, [LOADING_CONTEXT?.isLoading, hasMore]);

  const fetchData = async () => {
    LOADING_CONTEXT?.setIsLoading(true);
    postSearchTags(
      SEARCH_CONTEXT?.searchWord ?? [],
      PAGE_NUM_CONTEXT?.pageNumber ?? 1,
    ).then((response) => {
      ITEM_CONTEXT?.setItems((prev: ImageItemProps[]) => [
        ...prev,
        ...response?.data,
      ]);
      setHasMore(response?.data.length > 0);
      LOADING_CONTEXT?.setIsLoading(false);
    });
  };

  return (
    <>
      <S_ImageCardWrap>
        <S_ImageCardBox width={width} height={height} matrix={matrix}>
          {ITEM_CONTEXT?.items.map((item: ImageItemProps) => (
            <ImageCard key={item.imageId} item={item} />
          ))}
        </S_ImageCardBox>
        {/* 로딩 중일 때 */}
        {LOADING_CONTEXT?.isLoading && (
          <S_LoaderBar>Loading more...</S_LoaderBar>
        )}
        {LOADING_CONTEXT?.isLoading && (
          <ImageCardSkeleton count={6} width={width} height={height} />
        )}
        {/* 검색 결과가 없을 때  | 받아올 데이터가 없을 때 */}
        {!LOADING_CONTEXT?.isLoading && !hasMore && (
          <S_LoaderBar>No more photos to load.</S_LoaderBar>
        )}
        {/* 끝까지 스크롤 했을 때 */}
        {hasMore && <S_LoaderBar ref={endRef}></S_LoaderBar>}
      </S_ImageCardWrap>
    </>
  );
}

export default ImageCardList;
