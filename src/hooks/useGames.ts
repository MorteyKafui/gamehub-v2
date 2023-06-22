import { useInfiniteQuery } from "@tanstack/react-query";
import { FetchResponse } from "../services/apiClient";
import { Platform } from "./usePlatforms";
import APIClient from "../services/apiClient";
import useGameQueryStore from "../store";
import { Genre } from "./useGenres";

const apiClient = new APIClient<Games>("/games");

interface Publisher {
  id: number;
  name: string;
}

export interface Games {
  id: number;
  name: string;
  slug: string;
  genres: Genre[];
  publishers: Publisher[];
  description_raw: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

const useGames = () => {
  const gameQuery = useGameQueryStore(s => s.gameQuery);

  return useInfiniteQuery<FetchResponse<Games>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },

    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useGames;
