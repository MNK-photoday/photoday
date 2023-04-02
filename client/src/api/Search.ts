import axios, { AxiosError, AxiosResponse } from 'axios';

export const postSearchTags = async (
  searchWord: string,
  pageNumber: number,
  filter: string,
) => {
  const response: AxiosResponse = await axios.get(
    `${
      import.meta.env.VITE_APP_API
    }/tags/search?size=9&page=${pageNumber}&sort=${filter},desc&tags=${searchWord}`,
  );
  return response.data;
};
