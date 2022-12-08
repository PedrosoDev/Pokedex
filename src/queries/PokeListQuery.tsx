import { useQuery } from "react-query";

const LIMIT_PER_PAGE = 9;

export type PokeListQueryType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export async function pokeListRequest(page: number) {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT_PER_PAGE}&offset=${
      LIMIT_PER_PAGE * (page - 1)
    }`
  );
}

export default function usePokeListQuery(page: number) {
  return useQuery<PokeListQueryType>(
    ["poke", "list", page],
    async () => {
      const response = await pokeListRequest(page);

      return await response.json();
    },
    {
      keepPreviousData: true,
    }
  );
}
