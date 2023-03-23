import axios, { AxiosError, AxiosResponse } from 'axios';

export const postSearchTags = async (
  searchWord: string[],
  pageNumber: number,
) => {
  const data = {
    tags: searchWord,
  };
  try {
    const response: AxiosResponse = await axios.post(
      `${
        import.meta.env.VITE_APP_API
      }/tags/search?size=9&page=${pageNumber}&sort=imageId,desc`,
      data,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      console.log('테스트 검색 이미지 받아오기 실패');
    }
  }
};
