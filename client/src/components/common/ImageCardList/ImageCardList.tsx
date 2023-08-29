import { useContext, useEffect, useRef, useState } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import { S_ImageCardWrap, S_LoaderBar } from './ImageCardList.styles';
import { postSearchTags } from '../../../api/Search';
import { SearchContext } from '../../../context/SearchContext';
import { PageNumContext } from '../../../context/PageNumContext';
import { ImageContext } from '../../../context/ImageContext';
import ImageCardSkeleton from '../Skeleton/ImageCardSkeleton';
import { useLocation, useParams } from 'react-router-dom';

export type ImageCardListProps = {
  width: number;
  height?: number;
  matrix?: 'columns' | 'rows';
  filter?: string;
};

export type ImageCardProps = {
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

  const IMAGE_CONTEXT = useContext(ImageContext);
  const SEARCH_CONTEXT = useContext(SearchContext);
  const PAGE_NUM_CONTEXT = useContext(PageNumContext);

  const { search, id } = useParams();
  const { pathname } = useLocation();
  const isMain = pathname === '/';
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
      const pageNumber = PAGE_NUM_CONTEXT?.pageNumber ?? 1;
      const searchWord = SEARCH_CONTEXT?.searchWord ?? '';
      const isDetailPage = pathname.includes('detail') && !isMain;

      const response = await postSearchTags(
        isMain ? searchWord : search ?? searchWord,
        pageNumber,
        filter,
      );

      const filterImages = response?.data.filter(
        (item: ImageCardProps) => isDetailPage && item.imageId !== Number(id),
      );

      IMAGE_CONTEXT?.setItems((prev: ImageCardProps[]) => [
        ...prev,
        ...filterImages,
      ]);
      setHasMore(filterImages.length > 0);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <S_ImageCardWrap height={height} matrix={matrix}>
        {IMAGE_CONTEXT?.items.map((item: ImageCardProps, index) => (
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
