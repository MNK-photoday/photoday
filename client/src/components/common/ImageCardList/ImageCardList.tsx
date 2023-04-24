import { useContext, useEffect, useRef, useState } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { S_ImageCardWrap, S_LoaderBar } from './ImageCardList.styles';
import { postSearchTags } from '../../../api/Search';
import { ItemContext } from '../../../context/ItemContext';
import { SearchContext } from '../../../context/SearchContext';
import { PageNumContext } from '../../../context/PageNumContext';
import ImageCardSkeleton from '../Skeleton/ImageCardSkeleton';
import { useLocation, useParams } from 'react-router-dom';

export type ImageCardListProps = {
  width: number;
  height?: number;
  matrix?: 'columns' | 'rows';
  filter?: string;
};

export type ImageItemProps = {
  imageId: number;
  imageUrl: string;
  like: boolean;
  bookmark: boolean;
};

function ImageCardList({
  width,
  height,
  matrix = 'columns',
  filter = 'createdAt',
}: ImageCardListProps) {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver>();
  const endRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const ITEM_CONTEXT = useContext(ItemContext);
  const SEARCH_CONTEXT = useContext(SearchContext);
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);

  const { search, id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    fetchData();
  }, [SEARCH_CONTEXT?.searchWord, PAGE_NUM_CONTEXT?.pageNumber, filter]);

  useEffect(() => {
    if (loading) {
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
  }, [loading, hasMore]);

  const fetchData = async () => {
    try {
      postSearchTags(
        pathname !== '/'
          ? search ?? SEARCH_CONTEXT?.searchWord ?? ''
          : SEARCH_CONTEXT?.searchWord ?? '',
        PAGE_NUM_CONTEXT?.pageNumber ?? 1,
        filter,
      ).then((response) => {
        if (pathname.includes('detail')) {
          ITEM_CONTEXT?.setItems((prev: ImageItemProps[]) => {
            const newItems = response?.data.filter(
              (item: ImageItemProps) => item.imageId !== Number(id),
            );

            return [...prev, ...newItems];
          });

          setHasMore(response?.data.length > 0);
          setLoading(false);
        } else {
          ITEM_CONTEXT?.setItems((prev: ImageItemProps[]) => [
            ...prev,
            ...response?.data,
          ]);
          setHasMore(response?.data.length > 0);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <S_ImageCardWrap height={height} matrix={matrix}>
        {ITEM_CONTEXT?.items.map((item: ImageItemProps, index) => (
          <ImageCard key={index} item={item} />
        )) ?? <S_LoaderBar>No more photos to load.</S_LoaderBar>}
      </S_ImageCardWrap>
      {/* 로딩 중일 때 */}
      {loading && (
        <>
          <ImageCardSkeleton count={6} height={height} />
          <S_LoaderBar>Loading more...</S_LoaderBar>
        </>
      )}

      {/* 검색 결과가 없을 때  | 받아올 데이터가 없을 때 */}
      {!hasMore && <S_LoaderBar>No more photos to load.</S_LoaderBar>}
      {/* 끝까지 스크롤 했을 때 */}
      {hasMore && <S_LoaderBar ref={endRef}></S_LoaderBar>}
    </>
  );
}

export default ImageCardList;
