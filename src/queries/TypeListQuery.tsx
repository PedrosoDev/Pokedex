import { useQuery } from "react-query";

export type TypeListQueryType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export async function typeListRequest() {
  return await fetch("https://pokeapi.co/api/v2/type/");
}

export default function useTypeListQuery() {
  return useQuery<TypeListQueryType>(["type", "list"], async () => {
    const response = await typeListRequest();

    return await response.json();
  });
}
